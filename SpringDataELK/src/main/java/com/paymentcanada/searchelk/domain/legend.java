package com.paymentcanada.searchelk.domain;

import java.util.Date;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.databind.PropertyNamingStrategy;
import com.fasterxml.jackson.databind.annotation.JsonNaming;

@JsonNaming(PropertyNamingStrategy.SnakeCaseStrategy.class)
//@Document(indexName = "legend2", type = "legend2")
@Document(indexName = "cp101", type = "doc")
public class legend {



	private String type;
	private String summary;
	private int size;
	private String detail;
	private boolean available;

	@Id
	@Field(type=FieldType.Keyword)
	private String uuid;

	@Field(type = FieldType.Date, store = true, includeInParent = true,
			fielddata= true)
	private Date eventdate;


	@JsonInclude(value = Include.NON_EMPTY)
	private List<String> additionalFeatures;




	@JsonInclude(value = Include.NON_EMPTY)
	private String secretFeature;

	public legend() {

	}

	public legend(String detail, String summary, String type) {
		super();
		this.detail = detail;
		this.summary = summary;
		this.type = type;
	}

	public List<String> getAdditionalFeatures() {
		return additionalFeatures;
	}

	public String getDetail() {
		return detail;
	}

	public String getSummary() {
		return summary;
	}




	public Date getEventdate() {
		return eventdate;
	}

	public String getUuid() {
		return uuid;
	}

	public int getSize() {
		return size;
	}

	public String getSecretFeature() {
		return secretFeature;
	}

	public String getType() {
		return type;
	}

	public boolean isAvailable() {
		return available;
	}

	public void setAdditionalFeatures(List<String> additionalFeatures) {
		this.additionalFeatures = additionalFeatures;
	}

	public void setAvailable(boolean available) {
		this.available = available;
	}

	public void setDetail(String detail) {
		this.detail = detail;
	}

	public void setSummary(String summary) {
		this.summary = summary;
	}


	public void setEventdate(Date eventdate) {
		this.eventdate = eventdate;
 	}

	public void setUuid(String uuid) {
		this.uuid = uuid;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public void setSecretFeature(String secretFeature) {
		this.secretFeature = secretFeature;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "Legend [details=" + detail + ", summary=" + summary + ", type=" + type + ", size=" + size + ", available="

				+ available + ", eventdate=" + eventdate + ", additionalFeatures=" + additionalFeatures
 				+   ", secretFeature=" + secretFeature
				+ "]";
	}

}
