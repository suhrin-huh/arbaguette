package com.lucky.arbaguette.company.repository;

import com.lucky.arbaguette.boss.domain.Boss;
import com.lucky.arbaguette.company.domain.Company;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface CompanyRepository extends JpaRepository<Company, Integer> {

    Optional<Company> findByCompanyIdAndBoss(int companyId, Boss boss);

    List<Company> findAllByBoss_Email(String email);

    Optional<Company> findByCompanyIdAndBoss_Email(int companyId, String email);

}
