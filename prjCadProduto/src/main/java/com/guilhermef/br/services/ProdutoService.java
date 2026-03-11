package com.guilhermef.br.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.guilhermef.br.entities.Produto;
import com.guilhermef.br.repositories.ProdutoRepository;

@Service
public class ProdutoService {
	private final ProdutoRepository produtoRepository;
	
	@Autowired
	public ProdutoService(ProdutoRepository produtoRepository) {
		this.produtoRepository = produtoRepository;
	}
	
	public Produto saveProduto(Produto produto) {
		return produtoRepository.save(produto);
	}
	
	public void deleteProdutoById(Long id) {
		produtoRepository.deleteById(id);
	}
	
	public Produto getProdutoById(Long id) {
		return produtoRepository.findById(id).orElse(null);
	}
	
	public List<Produto> findAllProdutos(){
		return produtoRepository.findAll();
	}
	
	
}
