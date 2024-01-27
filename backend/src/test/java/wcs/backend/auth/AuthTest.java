// package wcs.backend.auth;

// import static org.junit.jupiter.api.Assertions.assertEquals;

// import static org.junit.jupiter.api.Assertions.assertTrue;
// import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
// import org.springframework.boot.test.context.SpringBootTest;
// import org.springframework.test.annotation.DirtiesContext;
// import org.springframework.test.annotation.DirtiesContext.ClassMode;
// import org.springframework.test.web.servlet.MockMvc;
// import org.springframework.test.web.servlet.MvcResult;
// import org.springframework.http.MediaType;
// import org.springframework.security.test.context.support.WithMockUser;

// import com.fasterxml.jackson.databind.ObjectMapper;
// import com.github.javafaker.Faker;
// import com.jayway.jsonpath.JsonPath;

// import jakarta.transaction.Transactional;

// import com.fasterxml.jackson.databind.JsonNode;

// import wcs.backend.dtos.LoginDto;
// import wcs.backend.dtos.UserDto;
// import wcs.backend.security.JwtTokenProvider;

// @SpringBootTest
// @AutoConfigureMockMvc
// public class AuthTest {

//   @Autowired
//   private MockMvc mockMvc;

//   @Autowired
//   private ObjectMapper objectMapper;

//   @Autowired
//   private JwtTokenProvider jwtTokenProvider;

//   @Test
//   @WithMockUser
//   @Transactional
//   @DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
//   public void testRegisterUser() throws Exception {
//     // Crée un utilisateur de test
//     UserDto userDto = new UserDto();
//     userDto.setEmail("newuser@example.com");
//     userDto.setPassword("newpassword123");
//     userDto.setFirstname("New");
//     userDto.setLastname("User");

//     mockMvc.perform(post("/api/auth/register")
//         .contentType(MediaType.APPLICATION_JSON)
//         .content(objectMapper.writeValueAsString(userDto)))
//         .andExpect(
//             result -> {
//               int status = result.getResponse().getStatus();
//               // Accepte le statut 201 Created ou 409 Conflict
//               assertTrue(status == 201 || status == 409);

//               if (status == 201) {
//                 // Si le statut est Created, vérifie le contenu de la réponse
//                 JsonNode jsonNode = objectMapper.readTree(result.getResponse().getContentAsString());
//                 assertEquals("newuser@example.com", jsonNode.get("email").asText());
//               }
//             });
//   }

//   // Creer un user avec un mail random pour éviter le conflit de mail déja existant puis se log avec cet user via le controller de test auth
//   @Test
//   @WithMockUser
//   @Transactional
//   @DirtiesContext(classMode = ClassMode.AFTER_EACH_TEST_METHOD)
//   public void testAuthenticate() throws Exception {
//     // Crée un utilisateur de test
//     Faker faker = new Faker();
//     String randomEmail = faker.internet().emailAddress();
//     UserDto userDto = new UserDto();
//     userDto.setEmail(randomEmail);
//     userDto.setPassword("password123");
//     userDto.setFirstname("Test");
//     userDto.setLastname("UserTest");

//     mockMvc.perform(post("/api/auth/register")
//         .contentType(MediaType.APPLICATION_JSON)
//         .content(objectMapper.writeValueAsString(userDto)))
//         .andExpect(status().isCreated());

//     // Appelle la méthode authenticate avec les détails de l'utilisateur créé
//     LoginDto loginDto = new LoginDto();
//     loginDto.setEmail(randomEmail);
//     loginDto.setPassword("password123");

//     MvcResult result = mockMvc.perform(post("/api/auth/login")
//         .contentType(MediaType.APPLICATION_JSON)
//         .content(objectMapper.writeValueAsString(loginDto)))
//         .andExpect(status().isOk())
//         .andExpect(jsonPath("$.accessToken").isNotEmpty())
//         .andExpect(jsonPath("$.user").isNotEmpty())
//         .andReturn();

//     // Récupère le token du résultat
//     String token = JsonPath.read(result.getResponse().getContentAsString(), "$.accessToken");

//     // Affiche le token dans la console
//     System.out.println("Token: " + token);

//     // Vérifie que le token est un JWT valide
//     boolean isValidToken = jwtTokenProvider.validateToken(token);

//     assertTrue(isValidToken);
//   }
// }
