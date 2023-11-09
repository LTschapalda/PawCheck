package de.pawcheck.backend.user;
import de.pawcheck.backend.cat.CatService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;


class LoginServiceTest {


    private final OAuth2AuthenticationToken token = Mockito.mock(OAuth2AuthenticationToken.class);

    private final OAuth2User principal = Mockito.mock(OAuth2User.class);

    private final UserRepo userRepo = Mockito.mock(UserRepo.class);

    private final CatService catService = Mockito.mock(CatService.class);

    private final UserService userService = new UserService(userRepo,catService);

    @Test
    void testHandleLogin_UserExists() {
        //GIVEN
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", "existingUserId");
        attributes.put("given_name", "John");
        attributes.put("email", "john@example.com");

        when(token.getPrincipal()).thenReturn(principal);
        when(principal.getAttributes()).thenReturn(attributes);
        when(userRepo.findById("existingUserId")).thenReturn(Optional.of(new User("existingUserId", "John", "john@example.com", List.of())));

        //WHEN
        User result = userService.handleLogin(token);

        //THEN
        verify(userRepo, never()).save(any(User.class));
        assertThat(result.id()).isEqualTo("existingUserId");
        assertThat(result.name()).isEqualTo("John");
        assertThat(result.email()).isEqualTo("john@example.com");
    }

    @Test
    void testHandleLogin_UserDoesNotExist() {
        //GIVEN
        Map<String, Object> attributes = new HashMap<>();
        attributes.put("sub", "newUserId");
        attributes.put("given_name", "Jane");
        attributes.put("email", "jane@example.com");

        when(token.getPrincipal()).thenReturn(principal);
        when(principal.getAttributes()).thenReturn(attributes);
        when(userRepo.findById("newUserId")).thenReturn(Optional.empty());
        when(userRepo.save(any(User.class))).thenAnswer(invocation -> invocation.getArgument(0));

        // WHEN
        User result = userService.handleLogin(token);

        //THEN
        verify(userRepo).save(any(User.class));
        assertThat(result.id()).isEqualTo("newUserId");
        assertThat(result.name()).isEqualTo("Jane");
        assertThat(result.email()).isEqualTo("jane@example.com");
    }
}
