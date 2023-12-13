package wcs.backend;

import org.springframework.context.annotation.PropertySource;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@PropertySource("file:../../../../../../../../.env")
public class backend {

	public static void main(String[] args) {
		SpringApplication.run(backend.class, args);
	}

}
