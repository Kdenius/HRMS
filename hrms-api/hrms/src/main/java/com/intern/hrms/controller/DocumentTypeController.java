package com.intern.hrms.controller;

import com.intern.hrms.commonResponse.SuccessResponse;
import com.intern.hrms.entity.travel.DocumentType;
import com.intern.hrms.service.general.DocumentTypeService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/document-type")
@Tag(name = "Document Type Controller", description = "Endpoint for Document type")
@Validated
@AllArgsConstructor
public class DocumentTypeController {

    private final DocumentTypeService documentTypeService;

    @GetMapping
    public ResponseEntity<SuccessResponse<List<DocumentType>>> getAllType(@RequestParam(defaultValue = "false") Boolean isProvided){
        List<DocumentType> documentTypes = documentTypeService.getDocumentTypes(isProvided);
        return ResponseEntity.ok(
                new SuccessResponse<>(null,documentTypes)
        );
    }

    @PostMapping("/{documentTypeName}/{isProvided}")
    @PreAuthorize("hasRole('HR')")
    public ResponseEntity<SuccessResponse<DocumentType>> addType(
           @NotBlank(message = "Value should not be null for type")
           @Size(max = 20, message = "length should be < 20")
           @PathVariable String documentTypeName,
           @PathVariable Boolean isProvided
    ){
        DocumentType type = documentTypeService.createDocumentType(documentTypeName, isProvided);
        return ResponseEntity.status(HttpStatus.CREATED).body(
                new SuccessResponse<>("Document Type Added",type)
        );
    }
}
