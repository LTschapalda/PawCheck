package de.pawcheck.backend.user;

import de.pawcheck.backend.IdService;
import de.pawcheck.backend.cat.CatRepo;
import de.pawcheck.backend.cat.CatService;
import de.pawcheck.backend.cat.Cat;
import org.junit.jupiter.api.Test;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {
    IdService idService = mock(IdService.class);
    CatRepo catRepo = mock(CatRepo.class);

    CatService catService = new CatService(catRepo, idService);
    UserRepo userRepo = mock(UserRepo.class);
    UserService userService = new UserService(userRepo, catService, idService);


    //TODO: Unit Test schreiben
    @Test
    void createUserAsOwner() {
        //GIVEN
        boolean isOwner = true;
        Cat newCat = new Cat("1234");
        when(catRepo.save(newCat)).thenReturn(newCat);
        when(idService.generateRandomId()).thenReturn("1234");
        User newUser = new User("1234", List.of(newCat.id()), List.of());
        when(userRepo.save(newUser)).thenReturn(newUser);

        //WHEN
        User expected;
        expected = userService.createUser((isOwner));

        //VERIFY
        verify(idService, times(2)).generateRandomId();
        verify(userRepo, times(1)).save(newUser);
        //THEN
        assertNotNull(expected);
        assertEquals(newUser,expected);
    }

    @Test
    void createUserAsSitter() {
        //GIVEN
        boolean isOwner = false;
        Cat newCat = new Cat("1234");
        when(catRepo.save(newCat)).thenReturn(newCat);
        when(idService.generateRandomId()).thenReturn("1234");
        User newUser = new User("1234", List.of(),List.of(newCat.id()));
        when(userRepo.save(newUser)).thenReturn(newUser);

        //WHEN
        User expected;
        expected = userService.createUser((isOwner));

        //VERIFY
        verify(idService, times(2)).generateRandomId();
        verify(userRepo, times(1)).save(newUser);
        //THEN
        assertNotNull(expected);
        assertEquals(newUser,expected);
    }
}