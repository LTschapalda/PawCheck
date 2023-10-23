package de.pawcheck.backend.cat;

import de.pawcheck.backend.IdService;
import org.junit.jupiter.api.Test;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CatServiceTest {

    CatRepo catRepo = mock(CatRepo.class);
    IdService idService = mock(IdService.class);
    CatService catService = new CatService(catRepo,idService);


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