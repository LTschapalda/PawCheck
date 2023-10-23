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
        when(catRepo.save(newCat)).thenReturn(newCat);
        when(idService.generateRandomId()).thenReturn("1234");
        //WHEN
        Cat expected = catService.addCat("Mo");
        //VERIFY
        verify(catRepo, times(1)).save(newCat);
        //THEN
        assertNotNull(expected);
        assertEquals(expected,newCat);
    }

    @Test
    void  addCatIdToUserList_whenAddCat() {
        //GIVEN
        Cat newCat = new Cat("1234", "Mo");
        User user = new User("123", List.of());
        when(catRepo.save(newCat)).thenReturn(newCat);
        when(idService.generateRandomId()).thenReturn("1234");
        when(userRepo.findById("123")).thenReturn(Optional.of(user));
        //WHEN
        // List<String> expected = user.catsOwned().add(newCat.id());
        //VERIFY
        verify(userRepo, times(1)).findById(user.id());
        //THEN
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