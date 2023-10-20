package de.pawcheck.backend.cat;

import de.pawcheck.backend.IdService;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class CatServiceTest {

    CatRepo catRepo = mock(CatRepo.class);
    IdService idService = mock(IdService.class);
    CatService catService = new CatService(catRepo,idService);

    @Test
    void returnNewCat_whenAddCat() {
        //GIVEN
        Cat newCat = new Cat("1234");
        when(catRepo.save(newCat)).thenReturn(newCat);
        when(idService.generateRandomId()).thenReturn("1234");
        //WHEN
        Cat expected = catService.addCat();
        //VERIFY
        verify(catRepo, times(1)).save(newCat);
        //THEN
        assertNotNull(expected);
        assertEquals(expected,newCat);
    }
}