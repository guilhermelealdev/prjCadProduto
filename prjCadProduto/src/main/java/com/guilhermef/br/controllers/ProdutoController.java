package com.guilhermef.br.controllers;

import java.io.IOException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.guilhermef.br.entities.Produto;
import com.guilhermef.br.services.ProdutoService;

@RestController
@RequestMapping("/produtos")
public class ProdutoController {
	private final ProdutoService produtoService;
	
	@Autowired
	public ProdutoController(ProdutoService produtoService) {
		this.produtoService = produtoService;
	}
	
	public ResponseEntity<Produto> criarProduto(@RequestPart("produto") Produto produto, @RequestPart("imagem") MultipartFile imagem) throws IOException{
		produto.setImagem(imagem.getBytes());
		
		Produto produtoSalvo = produtoService.saveProduto(produto);
		
		return ResponseEntity.status(HttpStatus.CREATED).body(produtoSalvo);
	}
	
	@DeleteMapping("/delete/{id}")
	public void deletarProduto(@PathVariable Long id) {
		produtoService.deleteProdutoById(id);
	}
	
	@GetMapping
	public List<Produto> listarTodosProdutos(){
		return produtoService.findAllProdutos();
	}
	
	@GetMapping("/{id}")
	public ResponseEntity<Produto> buscarProduto(@PathVariable Long id) {
		Produto produto = produtoService.getProdutoById(id);

		if (produto != null) {
			return ResponseEntity.ok(produto);
		} else {
			return ResponseEntity.notFound().build();
		}

	}
	
	
	
}
