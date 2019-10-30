
#  Please use the lastest branch, don't use the master branch.

#  JsonSearchELK

###  Search big Json file use Spring data Elasticserch, Logstash, kibana and Angular.  

Elasticserch is good for index and search big Json data, both for json file and json stream.  

## Tool Requiement   
Node v12+ npm v6+ Java v11+ Angular cli v7+ Gradle build tool v3+ Docker v1.3+  

##  How to use:  
### 1, Set up the ELK and load the json data:  
Pull my ELK docker image with json file in it : arthurisme/arthur_elk:v1.0.6  

Run ELK docker:   
docker run -p 5601:5601 -p 9200:9200 -p 9300:9300 -p 5044:5044 -it --name elk arthurisme/arthur_elk:v1.0.6  

There are some big json file already in the docker image: in the directory: /home/data/conf/file/json/  
You can copy your big json file into docker image by command: 
docker cp (file or folder path you file in your machine)  (container name):(Path in container)
Such as:
docker cp C:\Users\ArthurLiu\Documents\config  b5b82faf5cba:/home/data

Configure the Logstash configure file with command:   
sudo nano /home/data/conf/file/json/hello-world.conf    

Start Logstash and load json file to Elasticsearch data base:  
 /opt/logstash/bin/logstash -f '/home/data/conf/file/json/hello-world.conf'  

### 2, Set up Spring data Elastic back end Application:  
In the Spring data source code folder:  
gradle build -x test
Java -jar 'building Jar name with path'  

### 2, Set up Angular front end Application:  
Go to Angular source directory  
npm install
ng serve  

