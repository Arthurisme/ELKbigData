package com.paymentcanada.searchelk.service;

import java.util.ArrayList;
import java.util.Random;
import java.util.UUID;

import com.paymentcanada.searchelk.domain.legend;
import com.paymentcanada.searchelk.util.RandomDateUtil;
import org.springframework.stereotype.Service;

@Service
public class RandomLegendService implements LegendService {

	private Random random = new Random();

	@Override
	public legend generateLegend() {
		var randomDetail = DETAIL.get(random.nextInt(DETAIL.size()));
		var randomSummary = SUMMARY.get(random.nextInt(SUMMARY.size()));
		var randomType = TYPES.get(random.nextInt(TYPES.size()));

		var legend = new legend(randomDetail, randomSummary, randomType);

		String uniqueID = UUID.randomUUID().toString();
		legend.setUuid(uniqueID);

		legend.setAvailable(random.nextBoolean());
		legend.setSize(5000 + random.nextInt(7001));

		legend.setEventdate(RandomDateUtil.generateRandomDate());







		if (random.nextBoolean()) {
			legend.setSecretFeature("Feature S");
		}

		return legend;
	}

}
