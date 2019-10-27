package com.paymentcanada.searchelk.common;

import java.util.ArrayList;

import com.paymentcanada.searchelk.repository.LegendElasticRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.paymentcanada.searchelk.domain.legend;
import com.paymentcanada.searchelk.service.LegendService;

@Component
public class LegendElasticDatasource {

	@Autowired
	private LegendElasticRepository legendElasticRepository;

	@Autowired
	private LegendService randomLegendService;

	@Autowired
	private RestTemplate restTemplate;

	private static final Logger log = LoggerFactory.getLogger(LegendElasticDatasource.class);

	@EventListener(org.springframework.boot.context.event.ApplicationReadyEvent.class)
	public void connectToElasticSearchAndpopulateData() {
		// Danger! Delete the a index!
		log.info("Start DELETE");
		var response = restTemplate.exchange("http://3.231.38.61:9200/cp81", HttpMethod.DELETE, null,
				String.class);
		log.info("DELETE result : " + response.getBody());

		var legends = new ArrayList<legend>();
		for (int i = 0; i < 1000; i++) {
			legends.add(randomLegendService.generateLegend());
		}

		legendElasticRepository.saveAll(legends);

		log.info("legends in Elasticsearch : " + legendElasticRepository.count());
	}

}
