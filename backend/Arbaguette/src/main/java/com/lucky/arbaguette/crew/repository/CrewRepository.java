package com.lucky.arbaguette.crew.repository;

import com.lucky.arbaguette.company.domain.Company;
import com.lucky.arbaguette.crew.domain.Crew;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CrewRepository extends JpaRepository<Crew, Integer> {

    boolean existsByEmail(String email);

    boolean existsByTel(String tel);

    Optional<Crew> findByEmail(String email);

    List<Crew> findByCompany(Company company);

    Optional<Crew> findByTelAndName(String tel, String name);

    Optional<Crew> findByCompany_CompanyIdAndEmail(int companyId, String email);

    Optional<Crew> findByCompany_CompanyIdAndNameAndTel(int companyId, String name, String tel);

    Optional<Crew> findByAccount(String account);

    boolean existsByAccount(String account);

    Optional<Crew> findByBluetoothToken(String bluetoothToken);

}
