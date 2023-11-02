package de.pawcheck.backend.user;

import de.pawcheck.backend.IdService;
import de.pawcheck.backend.cat.Cat;
import de.pawcheck.backend.cat.CatRepo;
import de.pawcheck.backend.cat.CatService;
import de.pawcheck.backend.cat.Food;
import org.junit.jupiter.api.Test;
import org.springframework.data.mongodb.core.MongoTemplate;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    CatRepo catRepo = mock(CatRepo.class);
    IdService idService = new IdService();
    UserRepo userRepo = mock(UserRepo.class);
    MongoTemplate mongoTemplate = mock(MongoTemplate.class);
    CatService catService = new CatService(catRepo, idService, userRepo, mongoTemplate);
    UserService userService = new UserService(userRepo, catService);

    @Test
    void getAListOFCatsWhen_getCatsAssociatedToUser() {
        //GIVEN
        Cat newCat = new Cat("1234", "Mo");
        User user = new User("123", List.of("1234"));

        // Mocks und Annahmen
        when(userRepo.findById(user.id())).thenReturn(Optional.of(user));
        when(catRepo.findById(newCat.getId())).thenReturn(Optional.of(newCat));

        // WHEN
        List<Cat> expected = userService.getCatsAssociatedToUser(user.id());

        // THEN
        verify(userRepo, times(1)).findById(user.id());
        assertEquals(List.of(newCat), expected);
    }

    @Test
    void getEmptyListWhen_getCatsAssociatedToUser_UserIsNotPresent() {
        //GIVEN
        Cat newCat = new Cat("1234", "Mo");
        User user = new User("123", List.of("1234"));

        // Mocks und Annahmen
        when(userRepo.findById(user.id())).thenReturn(Optional.empty());
        when(catRepo.findById(newCat.getId())).thenReturn(Optional.of(newCat));

        // WHEN
        List<Cat> expected = userService.getCatsAssociatedToUser(user.id());

        // THEN
        verify(userRepo, times(1)).findById(user.id());
        assertEquals(expected, List.of());
    }

    @Test
    void getUpdatedCat_WhenUpdateCatById() {
        //GIVEN
        String catId = "1234";
        Cat existingCat = new Cat("1234", "Mo", new Food("40g", "30g"), new Food("50g", "40g"));
        Cat updatedCat = new Cat("1234", "NewName", new Food("20g", "10g"), new Food("30g", "20g"));

        when(catRepo.findById(catId)).thenReturn(Optional.of(existingCat));
        when(catRepo.save(any())).thenReturn(updatedCat);

        //WHEN
        Cat result = catService.updateCatById(catId, updatedCat);
        //THEN
        verify(catRepo, times(1)).findById(catId);
        verify(catRepo, times(1)).save(existingCat);
        assertEquals(updatedCat, result);
    }

    @Test
    void updateCatById_nonExistingCat_shouldReturnNull() {
        //GIVEN
        String catId = "nonExistentId";
        Cat updatedCat = new Cat("nonExistentId", "NewName", new Food("20g", "10g"), new Food("30g", "20g"));

        when(catRepo.findById(catId)).thenReturn(Optional.empty());

        //WHEN
        Cat result = catService.updateCatById(catId, updatedCat);

        //THEN
        verify(catRepo, times(1)).findById(catId);
        verify(catRepo, never()).save(any());
        assertEquals(null, result);
    }
}