package com.intern.hrms.utility;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

@Component
public class FileStorage {
    @Value("${storage.path}")
    private String path;

    public String uploadFile(String folderPath, String fileName, MultipartFile file){
        try{
            File directory = new File(path+folderPath);
            if(!directory.exists()){
                if(!directory.mkdirs()){
                    throw new RuntimeException("Issue in creating Directories in upload employee document.");
                }
            }
            String url = directory.getPath()+"/"+fileName+getFileExtension(file.getOriginalFilename());
            file.transferTo(new File(System.getProperty("user.dir")+"/"+url));
            return url;
        }catch (IOException exception){
            System.out.println("Error : Issue in Uploading File : "+exception.getMessage());
            throw new RuntimeException(exception.getMessage());
        }
    }

    public String updateFile(String url, MultipartFile file){
        try{
            String basePath = url.substring(0, url.lastIndexOf("."));
            String newPath = basePath + getFileExtension(file.getOriginalFilename());
            File location = new File(System.getProperty("user.dir") + "/" + newPath);
            file.transferTo(location);
            return newPath;
        }catch (IOException exception){
            System.out.println("Error : Issue in Updating File : "+exception.getMessage());
            throw new RuntimeException(exception.getMessage());
        }
    }

    public String getFileExtension(String name){
        return name.substring(name.indexOf("."));
    }

    public Resource getDocument(String url){
        Path documentpath = Paths.get(System.getProperty("user.dir")+"/"+url);
        try {
            Resource document = new UrlResource(documentpath.toUri());
            if(!document.exists())
                throw new RuntimeException("document not exist in folder");
            return document;
        }catch(Exception e){
            throw new RuntimeException(e.getMessage());
        }
    }
}
