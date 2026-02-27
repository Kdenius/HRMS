package com.intern.hrms.repository.travel;

import com.intern.hrms.entity.travel.TravelPlan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TravelPlanRepository extends JpaRepository<TravelPlan, Integer> {
    List<TravelPlan> findAllByIsActive(Boolean IsActive);
}
