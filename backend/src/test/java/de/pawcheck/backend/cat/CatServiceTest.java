package de.pawcheck.backend.cat;

import de.pawcheck.backend.IdService;
import de.pawcheck.backend.user.User;
import de.pawcheck.backend.user.UserRepo;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.data.mongodb.core.query.Query;


import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CatServiceTest {

    @Mock
    private CatRepo catRepo;
    @Mock
    private UserRepo userRepo;
    @Mock
    private IdService idService;
    @Mock
    private MongoTemplate mongoTemplate;
    @Captor
    private ArgumentCaptor<Query> queryCaptor;
    @Captor
    private ArgumentCaptor<Update> updateCaptor;

    @InjectMocks
    private CatService catService ;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.initMocks(this);
    }


    @Test
    void returnNewCat_whenAddCat() {
        //GIVEN
        Cat newCat = new Cat("1234", "Mo",null,null,null,null,null,null,null);
        User user = new User("123", List.of());
        User updatedUser = new User("123", List.of("1234"));
        when(idService.generateRandomId()).thenReturn("1234");
        when(userRepo.findById("123")).thenReturn(Optional.of(user));
        when(userRepo.save(user)).thenReturn(updatedUser);
        when(catRepo.save(newCat)).thenReturn(newCat);

        //WHEN
        Cat expected = catService.addCat("Mo");
        //VERIFY
        verify(idService).generateRandomId();
        verify(userRepo).findById("123");
        verify(userRepo).save(updatedUser);
        verify(catRepo).save(newCat);
        //THEN
        assertEquals(expected,newCat);
    }

    @Test
    void returnNull_whenAddCat_AndUserNotFound() {
        //GIVEN
        Cat newCat = new Cat("1234", "Mo",null,null,null,null,null,null,null);
        User user = new User("123", List.of());
        User updatedUser = new User("123", List.of("1234"));
        when(idService.generateRandomId()).thenReturn("1234");
        when(userRepo.findById("123")).thenReturn(Optional.empty());
        when(userRepo.save(user)).thenReturn(updatedUser);
        when(catRepo.save(newCat)).thenReturn(newCat);

        //WHEN
        catService.addCat("Mo");
        //VERIFY
        verify(catRepo, times(1)).save(newCat);
        //THEN
        assertTrue(user.catsOwned().isEmpty());
    }



    @Test
    void returnCatById_whenGetCatById() {
        //GIVEN
        Cat newCat = new Cat("1234", "Mo",null,null,null,null,null,null,null);
        when(catRepo.findById(newCat.getId())).thenReturn(Optional.of(newCat));
        //WHEN
        Cat expected = catService.getCatById("1234");
        //THEN
        assertEquals(newCat,expected);
    }

    @Test
    void returnErrorCat_whenGetCatByIdUnsuccessful() {
        //GIVEN
        Cat newCat = new Cat("1234", "Mo",null,null,null,null,null,null,null);
        when(catRepo.findById(newCat.getId())).thenReturn(Optional.of(newCat));
        //WHEN
        Cat wrongId = catService.getCatById("234");
        Cat expected = new Cat("000", "Cat not found",null,null,null,null,null,null,null);
        //THEN
        assertEquals(wrongId,expected);
    }

    @Test
    void deleteCatEverywhereById () {
        //GIVEN
        String catId = "1234";
        //WHEN
        catService.deleteCatEverywhereById(catId);
        //THEN
        verify(mongoTemplate).updateMulti(queryCaptor.capture(), updateCaptor.capture(), eq(User.class));
        verify(catRepo).deleteById(catId);
    }

}