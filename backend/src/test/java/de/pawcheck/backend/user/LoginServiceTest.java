package de.pawcheck.backend.user;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;

@RunWith(MockitoJUnitRunner.class)
public class LoginServiceTest {

    @Mock
    private OAuth2AuthenticationToken token;

    @Mock
    private OAuth2User principal;

    @Mock
    private UserRepo userRepo;

    @InjectMocks
    private UserService userService;

    @Test
    public void testHandleLogin_UserExists() {
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
    public void testHandleLogin_UserDoesNotExist() {
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
