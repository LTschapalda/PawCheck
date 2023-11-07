package de.pawcheck.backend.cat;

import de.pawcheck.backend.user.User;
import de.pawcheck.backend.user.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CatIntegrationTest {

    @Autowired
    MockMvc mockMvc;

    @Autowired
    CatRepo catRepo;

    @Autowired
    UserRepo userRepo;

    @Autowired
    MongoTemplate mongoTemplate;

    @BeforeEach
    void setUp() {
        mongoTemplate.getDb().drop();
    }

    @Test
    @DirtiesContext
    void createCatWithName() throws Exception{
        //GIVEN
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.post("/api/cat")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
        {"name" : "Mo"}
        """))
        //THEN
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").isNotEmpty())
                .andExpect(MockMvcResultMatchers.content().string(containsString("\"name\":\"Mo\"")));
    }

    @Test
    @DirtiesContext
    void getCatById_andExpectCatObject() throws Exception {
        //GIVEN
        catRepo.save(new Cat("1234", "Mo"));
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/cat/1234")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {"id": "1234"}
                        """))
                //THEN
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                         id : "1234",
                         name : "Mo"}
                        """));
    }

    @Test
    @DirtiesContext
    void getCatById_andExpectNotFoundCatObject() throws Exception {
        //GIVEN
        catRepo.save(new Cat("1234", "Mo"));
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/cat/234")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("""
                        {"id": "1234"}
                        """))
                //THEN
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {
                         id : "000",
                         name : "Cat not found"}
                        """));
    }

    @Test
    @DirtiesContext
    void getCatsAssociatedToUser_andExpectListOfCats() throws Exception {
        //GIVEN
        catRepo.save(new Cat("1234", "Mo"));
        userRepo.save(new User("123", List.of("1234")));

        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.get("/api/cats/123"))
                //THEN
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        [{"id":"1234","name":"Mo"}]
                        """));
    }

    @Test
    @DirtiesContext
    void deleteCatEverywhereById () throws Exception {
        //GIVEN
        catRepo.save(new Cat("1234", "Mo"));
        userRepo.save(new User("123", List.of("1234")));
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.delete("/api/cat/123"))
                //THEN
                .andExpect(status().isOk());
    }

    @Test
    @DirtiesContext
    void updateCatById() throws Exception {
        //GIVEN
        catRepo.save(new Cat("1234", "Mo"));
        //WHEN
        mockMvc.perform(MockMvcRequestBuilders.put("/api/cat/1234")
                .contentType(MediaType.APPLICATION_JSON)
                .content("""
                        {"id": "1234",
                         "name": "Mo",
                         "wet": {
                             "morning": "40g"
                           },
                           "dry": {
                             "morning": "50g"
                           }
                         }
                        """))
                //THEN
                .andExpect(status().isOk())
                .andExpect(MockMvcResultMatchers.content().json("""
                        {"id": "1234",
                         "name": "Mo",
                         "wet": {
                             "morning": "40g",
                             "evening": null
                         },
                         "dry": {
                             "morning": "50g",
                             "evening": null
                         }
                         }
                        """));
    }


}