package com.paymentcanada.searchelk.controller;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTimeout;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.fail;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

import com.paymentcanada.searchelk.domain.legend;
import com.paymentcanada.searchelk.service.LegendService;
import com.fasterxml.jackson.databind.ObjectMapper;

@SpringBootTest
@AutoConfigureMockMvc
class legendRestControllerTest {

	@Autowired
	private MockMvc mockMvc;

	private ObjectMapper objectMapper = new ObjectMapper();

	@Autowired
	private LegendService randomLegendService;

	@Test
	void testRandom() throws Exception {
		var endpoint = "/api/legend/v1/random";

		for (int i = 0; i < 100; i++) {
			var requestBuilder = MockMvcRequestBuilders.get(endpoint);

			var mockResult = mockMvc.perform(requestBuilder).andReturn();
			var content = mockResult.getResponse().getContentAsString();

			var legend = objectMapper.readValue(content, legend.class);

			assertTrue(LegendService.DETAIL.contains(legend.getDetail()));
			assertTrue(LegendService.SUMMARY.contains(legend.getSummary()));
		}
	}

}
