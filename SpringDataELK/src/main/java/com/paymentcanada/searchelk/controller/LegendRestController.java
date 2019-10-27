package com.paymentcanada.searchelk.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Random;

import com.paymentcanada.searchelk.exception.IllegalApiParamException;
import com.paymentcanada.searchelk.repository.LegendElasticRepository;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.paymentcanada.searchelk.domain.legend;
import com.paymentcanada.searchelk.domain.ErrorResponse;
import com.paymentcanada.searchelk.service.LegendService;

import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;

@CrossOrigin(origins = "*", allowedHeaders = "Origin, X-Requested-With, Content-Type, Accept" )
@RestController
@RequestMapping("/api/legend/v1")
public class LegendRestController {

	@Autowired
	private LegendService legendService;

	@Autowired
	private LegendElasticRepository legendElasticRepository;

	private Random random = new Random();

	private Logger log = LoggerFactory.getLogger(LegendRestController.class);

	@GetMapping(path = "/random", produces = MediaType.APPLICATION_JSON_VALUE)
	public legend random() {
		return legendService.generateLegend();
	}

	@ApiOperation(value = "Echo legend from request body")
	@PostMapping(path = "/echo", consumes = MediaType.APPLICATION_JSON_VALUE)
	public String echo(@ApiParam(value = "legend for echo") @RequestBody legend legend) {
		log.info("The legend is : " + legend);

		return legend.toString();
	}

	@GetMapping(path = "/random-legends", produces = MediaType.APPLICATION_JSON_VALUE)
	public List<legend> randomLegends() {
		var result = new ArrayList<legend>();

		for (int i = 0; i < random.nextInt(6); i++) {
			result.add(legendService.generateLegend());
		}

		return result;
	}

	@GetMapping(path = "/legends/count")
	public long countLegend() {
		return legendElasticRepository.count();
	}

	@PostMapping(path = "/legends", consumes = MediaType.APPLICATION_JSON_VALUE)
	public legend createLegend(@RequestBody legend legend) {
		return legendElasticRepository.save(legend);
	}

	//@ApiOperation(value = "Find legend by ID")
	@GetMapping(path = "/legends/{id}")
	public legend findLegendsById(@PathVariable String id) {
		return legendElasticRepository.findByUuid(id);
		//.orElse(null);
	}

	@PutMapping(path = "/legends/{id}")
	public legend updateLegendById(@PathVariable String id, @RequestBody legend updatedLegend) {
		updatedLegend.setUuid(id);
		return legendElasticRepository.save(updatedLegend);
	}

	@CrossOrigin(origins = "*", allowedHeaders = "Origin, X-Requested-With, Content-Type, Accept" )
	@GetMapping(path = "/legends/{type}/{summary}")
	@ApiResponses({
			@ApiResponse(code = 400, message = "Invalid parameter ", response = ErrorResponse.class),
			@ApiResponse(code = 200, message = "Return legends with specific type and summary", response = legend.class, responseContainer = "List") })
	public ResponseEntity<Object> findLegendsByPath(@PathVariable String type, @PathVariable String summary,
                                                    @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "25") int size) {
		var headers = new HttpHeaders();
		headers.add(HttpHeaders.SERVER, "Spring");
		headers.add("Custom", "Custom response header");

		if (StringUtils.isNumeric(summary)) {
			var errorResponse = new ErrorResponse("Invalid infor", System.currentTimeMillis());
			return new ResponseEntity<>(errorResponse, headers, HttpStatus.BAD_REQUEST);
		}

		var pageable = PageRequest.of(page, size, Sort.by(Direction.DESC, "size"));
		var legends = legendElasticRepository.findByTypeAndSummary(type, summary, pageable).getContent();

		return ResponseEntity.ok().headers(headers).body(legends);
	}

	@GetMapping(path = "/legends")
	public List<legend> findLegendsByParam(@RequestParam String type, @RequestParam String summary,
                                           @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "25") int size) {
		if (StringUtils.isNumeric(summary)) {
			throw new IllegalArgumentException("Invalid color : " + summary);
		}

		if (StringUtils.isNumeric(type)) {
			throw new IllegalApiParamException("Invalid detail : " + type);
		}

		var pageable = PageRequest.of(page, size, Sort.by(Direction.DESC, "size"));
		return legendElasticRepository.findByTypeAndSummary(type, summary, pageable).getContent();
	}



	@GetMapping(path = "/legends/datebefore")
	public List<legend> findLegendsReleasedBefore(
			@RequestParam(name = "eventdate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date firstReleaseDate,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "25") int size) {
		var pageable = PageRequest.of(page, size, Sort.by(Direction.DESC, "eventdate"));
		List<legend> legends = legendElasticRepository.findByFirstReleaseDateBefore(firstReleaseDate.getTime(), pageable).getContent();

		// Use this because uuid sometimes change version by some browser:
		legends.forEach(legend -> {
			legend.setUuid(legend.getUuid());
			System.out.println(legend.getUuid());
		});
		legendElasticRepository.saveAll(legends);

		// This is a temporarily function for use before the spring-data-Elasticserarch filter been set.
		legends.forEach(legend -> {
			legend.setDetail(null);
			System.out.println(legend.getUuid());
		});

		return legends;
	}


	@GetMapping(path = "/legends/dateafter")
	public List<legend> findLegendsReleasedAfter(
			@RequestParam(name = "eventdate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date firstReleaseDate,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "25") int size) {
		var pageable = PageRequest.of(page, size, Sort.by(Direction.ASC, "eventdate"));
		List<legend> legends = legendElasticRepository.findByFirstReleaseDateAfter(firstReleaseDate.getTime(), pageable).getContent();
		legends.forEach(legend -> {
			legend.setDetail(null);
			legend.setUuid(legend.getUuid());
			System.out.println(legend.getUuid());
		});
		legendElasticRepository.saveAll(legends);

		// Use this because uuid sometimes change version by some browser:
		legends.forEach(legend -> {
			legend.setUuid(legend.getUuid());
			System.out.println(legend.getUuid());
		});
		legendElasticRepository.saveAll(legends);

		// This is a temporarily function for use before the spring-data-Elasticserarch filter been set.
		legends.forEach(legend -> {
			legend.setDetail(null);
			System.out.println(legend.getUuid());
		});

		return legends;
	}

	@GetMapping(path = "/legends/datebetween")
	public List<legend> findLegendsReleasedBetween(
			@RequestParam(name = "startdate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date firstReleaseDateStart,
			@RequestParam(name = "enddate") @DateTimeFormat(pattern = "yyyy-MM-dd") Date firstReleaseDateEnd,
			@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "25") int size) {

		var pageable = PageRequest.of(page, size, Sort.by(Direction.ASC, "eventdate"));

		List<legend> legends =  legendElasticRepository.findByFirstReleaseDateBetween(firstReleaseDateStart.getTime(),firstReleaseDateEnd.getTime(), pageable).getContent();

		// Use this because uuid sometimes change version by some browser:
		legends.forEach(legend -> {
			legend.setUuid(legend.getUuid());
			System.out.println(legend.getUuid());
		});
		legendElasticRepository.saveAll(legends);

		// This is a temporarily function for use before the spring-data-Elasticserarch filter been set.
		legends.forEach(legend -> {
			legend.setDetail(null);
			System.out.println(legend.getUuid());
		});

		return legends;
	}

}
