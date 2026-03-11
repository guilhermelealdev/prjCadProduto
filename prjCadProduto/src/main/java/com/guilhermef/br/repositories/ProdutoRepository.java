package com.guilhermef.br.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.guilhermef.br.entities.Produto;

@Repository
public interface ProdutoRepository extends JpaRepository<Produto,Long>{

}
