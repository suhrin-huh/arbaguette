package com.lucky.arbaguette.company.repository;

import com.lucky.arbaguette.company.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Integer> {


}
