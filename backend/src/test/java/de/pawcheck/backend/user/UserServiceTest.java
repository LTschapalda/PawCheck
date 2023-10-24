package de.pawcheck.backend.user;

import de.pawcheck.backend.IdService;
import de.pawcheck.backend.cat.Cat;
import de.pawcheck.backend.cat.CatRepo;
import de.pawcheck.backend.cat.CatService;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserServiceTest {

    CatRepo catRepo = mock(CatRepo.class);
    IdService idService = new IdService();
    UserRepo userRepo = mock(UserRepo.class);
    CatService catService = new CatService(catRepo,idService,userRepo);
    UserService userService = new UserService(userRepo,catService);

    @Test
    void GetAListOFCatsWhen_getCatsAssociatedToUser() {
        //GIVEN
        Cat newCat = new Cat("1234", "Mo");
        User user = new User("123", List.of("1234"));

        // Mocks und Annahmen
        when(userRepo.findById(user.id())).thenReturn(Optional.of(user));
        when(catRepo.findById(newCat.id())).thenReturn(Optional.of(newCat));

        // WHEN
        List<Cat> expected = userService.getCatsAssociatedToUser(user.id());

        // THEN
        verify(userRepo, times(1)).findById(user.id());
        assertEquals(List.of(newCat), expected);
    }
}