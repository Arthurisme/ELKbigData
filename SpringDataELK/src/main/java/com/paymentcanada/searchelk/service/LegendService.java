package com.paymentcanada.searchelk.service;

import java.util.List;

import com.paymentcanada.searchelk.domain.legend;

public interface LegendService {

	List<String> DETAIL = List.of("a", "b", "b", "d", "e");
	List<String> SUMMARY = List.of("a", "b", "c", "d", "e");
	List<String> TYPES = List.of("a", "b", "c", "d", "e");


	legend generateLegend();

}
