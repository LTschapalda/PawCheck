package de.pawcheck.backend.cat;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import static org.hamcrest.Matchers.containsString;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
class CatIntegrationTest {

    @Autowired
    MockMvc mockMvc;
    @Test
    @DirtiesContext
    void createCatWithName() throws Exception{
        //GIVEN
        String name = "Mo";
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
}