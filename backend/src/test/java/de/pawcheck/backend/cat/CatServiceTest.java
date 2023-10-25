package de.pawcheck.backend.cat;

import de.pawcheck.backend.IdService;
import de.pawcheck.backend.user.User;
import de.pawcheck.backend.user.UserRepo;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CatServiceTest {

    CatRepo catRepo = mock(CatRepo.class);
    IdService idService = mock(IdService.class);
    UserRepo userRepo = mock(UserRepo.class);
    CatService catService = new CatService(catRepo,idService,userRepo);


    @Test
    void returnNewCat_whenAddCat() {
        //GIVEN
        Cat newCat = new Cat("1234", "Mo");
        User user = new User("123", List.of());
        User updatedUser = new User("123", List.of("1234"));
        when(idService.generateRandomId()).thenReturn("1234");
        when(userRepo.findById("123")).thenReturn(Optional.of(user));
        when(userRepo.save(user)).thenReturn(updatedUser);
        when(catRepo.save(newCat)).thenReturn(newCat);

        //WHEN
        Cat expected = catService.addCat("Mo");
        //VERIFY
        verify(catRepo, times(1)).save(newCat);
        //THEN
        assertEquals(expected,newCat);
    }

    @Test
    void returnNull_whenAddCat_AndUserNotFound() {
        //GIVEN
        Cat newCat = new Cat("1234", "Mo");
        User user = new User("123", List.of());
        User updatedUser = new User("123", List.of("1234"));
        when(idService.generateRandomId()).thenReturn("1234");
        when(userRepo.findById("123")).thenReturn(Optional.empty());
        when(userRepo.save(user)).thenReturn(updatedUser);
        when(catRepo.save(newCat)).thenReturn(newCat);

        //WHEN
        Cat expected = catService.addCat("Mo");
        //VERIFY
        verify(catRepo, times(1)).save(newCat);
        //THEN
        assertTrue(user.catsOwned().isEmpty());
    }



    @Test
    void returnCatById_whenGetCatById() {
        //GIVEN
        Cat newCat = new Cat("1234", "Mo");
        when(catRepo.findById(newCat.id())).thenReturn(Optional.of(newCat));
        //WHEN
        Cat expected = catService.getCatById("1234");
        //THEN
        assertEquals(newCat,expected);
    }

    @Test
    void returnErrorCat_whenGetCatByIdUnsuccessful() {
        //GIVEN
        Cat newCat = new Cat("1234", "Mo");
        when(catRepo.findById(newCat.id())).thenReturn(Optional.of(newCat));
        //WHEN
        Cat wrongId = catService.getCatById("234");
        Cat expected = new Cat("000", "Cat not found");
        //THEN
        assertEquals(wrongId,expected);
    }
}