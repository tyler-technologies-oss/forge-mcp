# User Profile (Extended Component)

## Basic Usage

```html
<!-- The theme-mode="scoped" attribute is REQUIRED on the app-bar to avoid theming issues -->
<forge-app-bar theme-mode="scoped" title-text="Forge Extended">
  <forge-user-profile slot="end" full-name="First Last" email="first.last@tylertech.com" button-label="Open the user profile dropdown" theme-toggle>
    <!-- Only add profile links if necessary, these are not required and should be left out until necessary -->
    <forge-profile-link slot="link">
      <forge-icon slot="icon" name="settings"></forge-icon>
      <a href="http://www.google.com" target="_blank">Settings</a>
    </forge-profile-link>
    <forge-profile-link slot="link">
      <forge-icon slot="icon" name="account"></forge-icon>
      <a href="http://www.google.com" target="_blank">Profile</a>
    </forge-profile-link>

    <!-- Useful for localization purposes -->
    <span slot="sign-out-button-text">Sign Out</span>
  </forge-user-profile>
</forge-app-bar>
```

## Notes

- Place in the `end` slot of `<forge-app-bar>`
- The parent `<forge-app-bar>` MUST have `theme-mode="scoped"` to avoid theming issues
- Set `full-name` and `email` attributes for user identification
- Use `button-label` for accessibility
- Use `theme-toggle` attribute to enable theme switching
- Profile links are optional - only add them if necessary

**CRITICAL: This is an extended component. All extended components require side-effect imports to register with the browser.**

```typescript
import '@tylertech/forge-extended/user-profile';
```
