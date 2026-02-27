package com.intern.hrms.repository.travel;

import com.intern.hrms.entity.Employee;
import com.intern.hrms.entity.travel.EmployeeTravelExpense;
import com.intern.hrms.entity.travel.TravelEmployee;
import com.intern.hrms.entity.travel.TravelExpenseType;
import com.intern.hrms.enums.TravelExpenseStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDate;
import java.util.List;

public interface EmployeeTravelExpenseRepository extends JpaRepository<EmployeeTravelExpense, Integer> {
    List<EmployeeTravelExpense> findAllByTravelEmployee_Employee(Employee travelEmployeeEmployee);

    List<EmployeeTravelExpense> findAllByTravelEmployee_TravelPlan_TravelPlanIdAndStatusNot(int travelEmployeeTravelPlanTravelPlanId, TravelExpenseStatusEnum status);

    boolean existsByExpenseDateAndStatusInAndTravelExpenseTypeAndTravelEmployee(LocalDate expenseDate, List<TravelExpenseStatusEnum> statuses, TravelExpenseType travelExpenseType, TravelEmployee travelEmployee);
}
