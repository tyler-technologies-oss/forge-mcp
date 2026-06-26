# App Launcher (Extended Component)

## Basic Usage

```html
<!-- The theme-mode="scoped" attribute is REQUIRED on the app-bar to avoid theming issues -->
<forge-app-bar theme-mode="scoped">
  <forge-app-launcher slot="end" id="app-launcher"></forge-app-launcher>
</forge-app-bar>

<script>
  const appLauncher = document.querySelector('#app-launcher');

  const relatedApps = [
    {
      label: 'Project Management',
      iconName: 'assignment',
      uri: 'https://project-management.example.com',
      target: '_blank'
    },
    {
      label: 'Time Tracking',
      iconName: 'access_time',
      uri: '',
      target: '_blank'
    }
  ];

  const allApps = [
    {
      label: 'Payments Administration',
      iconName: 'payment',
      uri: 'https://payments-admin.example.com',
      target: '_blank'
    },
    {
      label: 'PEP Administration',
      iconName: 'admin_panel_settings',
      uri: 'https://pep-admin.example.com',
      target: '_blank'
    },
    {
      label: 'User Management',
      iconName: 'people',
      uri: 'https://user-management.example.com',
      target: '_blank'
    }
  ];

  appLauncher.relatedApps = relatedApps;
  appLauncher.allApps = allApps;
</script>
```

## Notes

- Place in the `end` slot of `<forge-app-bar>`, typically alongside user profile
- The parent `<forge-app-bar>` MUST have `theme-mode="scoped"` to avoid theming issues
- Requires JavaScript to set `relatedApps` and `allApps` properties
- `relatedApps`: Applications relevant to the current user's context
- `allApps`: All available applications within the ecosystem

**CRITICAL: This is an extended component. All extended components require side-effect imports to register with the browser.**

```typescript
import '@tylertech/forge-extended/app-launcher';
```
