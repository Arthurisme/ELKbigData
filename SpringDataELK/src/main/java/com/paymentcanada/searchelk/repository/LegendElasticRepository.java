package com.paymentcanada.searchelk.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import com.paymentcanada.searchelk.domain.legend;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*", allowedHeaders = "Origin, X-Requested-With, Content-Type, Accept" )
@Repository
public interface LegendElasticRepository extends ElasticsearchRepository<legend, String> {

	public Page<legend> findByTypeAndSummary(String detail, String summary, Pageable pageable);

	@Query("{ \"range\":{ \"eventdate\":{ \"gt\":?0 } } }")
	public Page<legend> findByFirstReleaseDateAfter(long date, Pageable pageable);

	@Query("{ \"range\":{ \"eventdate\":{ \"lt\":?0 } } }")
	public Page<legend> findByFirstReleaseDateBefore(long date, Pageable pageable);

	@Query("{ \"range\":{ \"eventdate\":{ \"gte\":?0, \"lte\":?1  } } }")
	public Page<legend> findByFirstReleaseDateBetween(long dateStart, long dateEnd, Pageable pageable);

	//Optional<Object> findByUuid(String id);
	public legend findByUuid(String id);

}
