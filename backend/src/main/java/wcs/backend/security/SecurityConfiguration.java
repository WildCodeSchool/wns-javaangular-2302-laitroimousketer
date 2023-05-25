package wcs.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.oauth2.server.resource.OAuth2ResourceServerConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.oauth2.server.resource.web.BearerTokenAuthenticationEntryPoint;
import org.springframework.security.oauth2.server.resource.web.access.BearerTokenAccessDeniedHandler;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
@Configuration
public class SecurityConfiguration {

  @Bean
  public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
      http
      .csrf().disable()
      .authorizeHttpRequests((authorize) -> authorize.anyRequest().permitAll())
//        .authorizeHttpRequests((authorize) -> authorize.anyRequest().authenticated())
      .httpBasic(Customizer.withDefaults());
      return http.build();
  }


  // Plus bas, pour activer cors et l'auth //
  
  //     @Bean
  //     public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
  //     http
  //         .csrf().disable()
  //         .cors() // Supprimer cette ligne pour désactiver la configuration CORS
  //         .and()
  //         .authorizeHttpRequests((authorize) -> authorize.anyRequest().authenticated())
  //         .httpBasic(Customizer.withDefaults());
  //     return http.build();
  // }

  //     @Bean
  //     public CorsConfigurationSource corsConfigurationSource() {
  //         CorsConfiguration configuration = new CorsConfiguration();
  //         configuration.addAllowedOrigin("http://localhost:4200"); // Remplacez par l'URL de votre frontend Angular
  //         configuration.addAllowedHeader("*");
  //         configuration.addAllowedMethod("*");
  //         configuration.setAllowCredentials(true);

  //         UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
  //         source.registerCorsConfiguration("/**", configuration);

  //         return source;
  //     }

}
