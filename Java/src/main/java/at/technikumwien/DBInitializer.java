package at.technikumwien;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;

@Configuration
public class DBInitializer {
	@Autowired
	private NewsRepository newsRepository;
		
	@EventListener(ApplicationReadyEvent.class)
	public void handleApplicationReady() {
		newsRepository.saveAll(Arrays.asList(
			new News("Hello World!", "Herzlich willkommen am Planeten Erde."),
			new News("News-Portal online!", "Unser neues News-Portal ist online.")
		));
	}
}