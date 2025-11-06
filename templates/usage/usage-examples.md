# Tyler Forge Components - Basic Usage Examples

## Accordion (forge-accordion)

```html
<forge-accordion>
  <button id=header1>Panel 1 Title</button>
  <forge-expansion-panel trigger="header1">
    <div>Panel 1 content goes here</div>
  </forge-expansion-panel>
  <button id=header2>Panel 2 Title</button>
  <forge-expansion-panel trigger="header2">
    <div>Panel 2 content goes here</div>
  </forge-expansion-panel>
</forge-accordion>
```

## App Bar (forge-app-bar)

```html
<!-- Always set theme-mode="scoped" and title-text -->
<forge-app-bar theme-mode="scoped" title-text="Application Title">
  <!-- Optional menu button if using a drawer -->
  <forge-app-bar-menu-button slot="start"></forge-app-bar-menu-button>

  <!-- Optional search -->
  <forge-app-bar-search slot="center">
    <input type="text" placeholder="Search..." />
  </forge-app-bar-search>

  <!-- From the @tylertech/forge-extended package -->
  <forge-user-profile slot="end"></forge-user-profile>
</forge-app-bar>
```

## App Bar Help Button (forge-app-bar-help-button)

```html
<forge-app-bar-help-button slot="end"></forge-app-bar-help-button>
```

## App Bar Menu Button (forge-app-bar-menu-button)

```html
<forge-app-bar-menu-button slot="start"></forge-app-bar-menu-button>
```

## App Bar Notification Button (forge-app-bar-notification-button)

```html
<!-- With badge and count-->
<forge-app-bar-notification-button slot="end" show-badge count="5"></forge-app-bar-notification-button>

<!-- With simple "dot" badge -->
<forge-app-bar-notification-button slot="end" show-badge dot></forge-app-bar-notification-button>
```

## App Bar Profile Button (forge-app-bar-profile-button)

```html
<forge-app-bar-profile-button slot="end" full-name="John Doe" email="john@example.com"></forge-app-bar-profile-button>
```

## App Bar Search (forge-app-bar-search)

```html
<forge-app-bar-search slot="center">
  <input type="text" placeholder="Search...">
</forge-app-bar-search>
```

## App Bar User Profile (forge-user-profile)

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

## App Bar App Launcher (forge-app-bar-app) Extended Component

The `<forge-app-launcher>` component is designed to be used within a `<forge-app-bar>`, typically placed in the end slot alongside other user-related actions like the user profile component. This ensures consistent navigation structure throughout applications.

When using the app launcher, you can provide two primary data sources:

- `relatedApps`: An array of applications relevant to the current user's context, displayed in the default view.
- `allApps`: An array of all available applications within the ecosystem.

To do so, this requires the use of JavaScript to set the properties on the component instance.

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
      uri: ''
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

## Autocomplete (forge-autocomplete)

```html
<forge-autocomplete>
  <!-- Autocompletes only require a child <input> but it's typically composed with a <forge-text-field> -->
  <forge-text-field>
    <label for="autocomplete-input">Search</label>
    <input id="autocomplete-input" type="text" placeholder="Type to search..." />
  </forge-text-field>
</forge-autocomplete>

<script>
const autocomplete = document.querySelector('forge-autocomplete');
autocomplete.filter = (filterText) => {
  // Typically this would call an API to get suggestions
  const suggestions = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  const filtered = suggestions.filter(item => item.toLowerCase().includes(filterText.toLowerCase()));
  return Promise.resolve(filtered);
};
</script>
```

## Avatar (forge-avatar)

```html
<!-- Text avatar -->
<forge-avatar text="John Doe"></forge-avatar>

<!-- Image avatar -->
<forge-avatar image-url="path/to/avatar.jpg"></forge-avatar>
```

## Backdrop (forge-backdrop)

```html
<forge-backdrop></forge-backdrop>
```

## Badge (forge-badge)

```html
<forge-badge>5</forge-badge>
<forge-badge dot></forge-badge>
<forge-badge theme="success">New</forge-badge>
```

## Banner (forge-banner)

```html
<forge-banner theme="info" can-dismiss>
  <forge-icon name="info" slot="icon"></forge-icon>
  <span>This is an informational banner message.</span>
</forge-banner>

<!-- With action button -->
<forge-banner theme="warning">
  <forge-icon name="warning" slot="icon"></forge-icon>
  <span>This is a warning banner message.</span>
  <forge-button slot="button">Take Action</forge-button>
</forge-banner>
```

## Bottom Sheet (forge-bottom-sheet)

```html
<forge-bottom-sheet>
  <div slot="header">Bottom Sheet Title</div>
  <div>Bottom sheet content goes here</div>
</forge-bottom-sheet>

<script>
const bottomSheet = document.querySelector('forge-bottom-sheet');
bottomSheet.open = true;
</script>
```

## Button (forge-button)

```html
<!-- Basic buttons -->
<forge-button>Text Button</forge-button>
<forge-button variant="outlined">Outlined Button</forge-button>
<forge-button variant="tonal">Tonal Button</forge-button>
<forge-button variant="filled">Filled Button</forge-button>
<forge-button variant="raised">Raised Button</forge-button>

<!-- With icon -->
<forge-button>
  <forge-icon name="add" slot="start"></forge-icon>
  Add Item
</forge-button>

<!-- Submit button -->
<form>
  <forge-button type="submit" variant="filled">Submit</forge-button>
</form>
```

## Button Area (forge-button-area)

```html
<!-- Using a card is not required, but for example this makes the whole card appear interactive-->
<forge-card>
  <forge-button-area>
    <!-- Button areas require a button element -->
    <button slot="button" aria-label="Click me"></button>
    <div>
      <h3>Title</h3>
      <p>Description content</p>
    </div>
  </forge-button-area>
</forge-card>
```

## Button Toggle (forge-button-toggle)

```html
<forge-button-toggle-group>
  <forge-button-toggle value="option1">Option 1</forge-button-toggle>
  <forge-button-toggle value="option2">Option 2</forge-button-toggle>
  <forge-button-toggle value="option3">Option 3</forge-button-toggle>
</forge-button-toggle-group>
```

## Button Toggle Group (forge-button-toggle-group)

```html
<forge-button-toggle-group>
  <forge-button-toggle value="left">Left</forge-button-toggle>
  <forge-button-toggle value="center">Center</forge-button-toggle>
  <forge-button-toggle value="right">Right</forge-button-toggle>
</forge-button-toggle-group>
```

## Calendar (forge-calendar)

```html
<forge-calendar></forge-calendar>
```

## Card (forge-card)

```html
<forge-card>
  <!-- Toolbar is not required, but just for example purposes -->
  <forge-toolbar>
    <h2 class="forge-typography--heading4" slot="start">Card Title</h2>
  </forge-toolbar>
  <p>Card content goes here</p>
</forge-card>
```

## Checkbox (forge-checkbox)

```html
<forge-checkbox>Checkbox Label</forge-checkbox>
```

## Chip (forge-chip)

```html
<forge-chip-set>
  <forge-chip>Basic Chip</forge-chip>
  <forge-chip>Deletable Chip</forge-chip>
  <forge-chip>
    <forge-icon name="person" slot="start"></forge-icon>
    Chip with Icon
  </forge-chip>
</forge-chip-set>
```

## Chip Field (forge-chip-field)

```html
<forge-chip-field>
  <label slot="label" for="demo-chip-field-input">Test label</label>
  <input type="text" id="demo-chip-field-input" autocomplete="off">
</forge-chip-field>

<script>
// Listen for chip add events to add chips to the element
const chipField = document.querySelector('forge-chip-field-member-added');
chipField.addEventListener('chipadd', (event) => {
  console.log('Chip added:', event.detail);
});

// Listen for chip remove events to remove chips from the element
chipField.addEventListener('chipremove', (event) => {
  console.log('Chip removed:', event.detail);
});
</script>
```

## Chip Set (forge-chip-set)

```html
<!-- Basic (action) chips -->
<forge-chip-set>
  <forge-chip>Chip 1</forge-chip>
  <forge-chip>Chip 2</forge-chip>
  <forge-chip>Chip 3</forge-chip>
</forge-chip-set>

<!-- Filter chips -->
<forge-chip-set type="filter">
  <forge-chip>Filter 1</forge-chip>
  <forge-chip>Filter 2</forge-chip>
  <forge-chip>Filter 3</forge-chip>
</forge-chip-set>

<!-- Choice chips -->
<forge-chip-set type="choice">
  <forge-chip>Choice 1</forge-chip>
  <forge-chip>Choice 2</forge-chip>
  <forge-chip>Choice 3</forge-chip>
</forge-chip-set>

<!-- Input chips -->
<forge-chip-set type="input">
  <forge-chip>Input 1</forge-chip>
  <forge-chip>Input 2</forge-chip>
  <forge-chip>Input 3</forge-chip>
</forge-chip-set>
```

## Circular Progress (forge-circular-progress)

```html
<!-- Indeterminate -->
<forge-circular-progress></forge-circular-progress>

<!-- Determinate with 75% progress and track -->
<forge-circular-progress determinate progress="0.75" track></forge-circular-progress>
```

## Color Picker (forge-color-picker)

```html
<forge-color-picker value="#ff5722"></forge-color-picker>
```

## Date Picker (forge-date-picker)

```html
<forge-date-picker>
  <forge-text-field>
    <label for="date-input">Select Date</label>
    <input id="date-input" type="text" placeholder="Select date..." />
  </forge-text-field>
</forge-date-picker>
```

## Date Range Picker (forge-date-range-picker)

```html
<forge-date-range-picker>
  <forge-text-field>
    <label for="from-date-input">Select date range</label>
    <input id="from-date-input" type="text" placeholder="From date..." />
    <input id="to-date-input" type="text" placeholder="To date..." />
  </forge-text-field>
</forge-date-range-picker>
```

## Dialog (forge-dialog)

```html
<forge-dialog>
  <!-- Example header -->
  <forge-toolbar>
    <h2 class="forge-typography--heading4" slot="start">Dialog Title</h2>
    <forge-icon-button slot="end" id="close-button">
      <forge-icon name="close"></forge-icon>
    </forge-icon-button>
  </forge-toolbar>

  <!-- Example content -->
  <p>Dialog content goes here</p>

  <!-- Example footer -->
  <forge-toolbar inverted slot="footer">
    <forge-button variant="text" id="cancel-button">Cancel</forge-button>
    <forge-button id="ok-button">OK</forge-button>
  </forge-toolbar>
</forge-dialog>

<script>
const dialog = document.querySelector('forge-dialog');

// Dialogs are typically opened via some user action
dialog.open = true;

// Dialogs can also be created dynamically via JavaScript and injected into the DOM
const dynamicDialog = document.createElement('forge-dialog');
dynamicDialog.innerHTML = `<p>This is a dynamically created dialog</p>`;
document.body.appendChild(dynamicDialog);
dynamicDialog.open = true;
</script>
```

### Angular Usage
It's more common to use the `DialogService` from `@tylertech/forge-angular` to open dialogs programmatically by providing a custom Angular component to render within the dialog.

## Divider (forge-divider)

```html
<!-- Horizontal divider example -->
<forge-divider></forge-divider>

<!-- Vertical divider example -->
<forge-divider vertical></forge-divider>
```

## Drawer (forge-drawer)

```html
<forge-drawer>
  <nav>
    <forge-list>
      <forge-list-item>
        <forge-icon name="home" slot="start"></forge-icon>
        <a href="/home">Home</a>
      </forge-list-item>
      <forge-list-item>
        <forge-icon name="settings" slot="start"></forge-icon>
        <a href="/settings">Settings</a>
      </forge-list-item>
    </forge-list>
  </nav>
</forge-drawer>
```

## Expansion Panel (forge-expansion-panel)

```html
<!-- With trigger element (recommended) -->
<button id="expand-button">Expand</button>
<forge-expansion-panel trigger="expand-button">
  <div>Panel content that can be expanded or collapsed</div>
</forge-expansion-panel>

<!-- With slotted header (interactive) element (not recommended) -->
<forge-expansion-panel>
  <button slot="header">Expansion Panel Title</button>
  <div>Panel content that can be expanded or collapsed</div>
</forge-expansion-panel>
```

## FAB (forge-fab)

```html
<forge-fab aria-label="Add Item">
  <forge-icon name="add"></forge-icon>
</forge-fab>
```

## Field (forge-field)

```html
<forge-field>
  <label for="field-input">Field Label</label>
  <input type="text" id="field-input" />
</forge-field>
```

## File Picker (forge-file-picker)

```html
<forge-file-picker accept=".jpg,.png,.pdf">
  <span slot="primary">Drag files here or</span>
  <span slot="secondary">Secondary text here</span>
  <forge-button variant="outlined">Select files</forge-button>
  <span slot="helper-text">Supported formats: .jpg, .png, .pdf</span>
</forge-file-picker>

<!-- Compact -->
<forge-file-picker compact>
  <forge-button variant="outlined">Select files</forge-button>
</forge-file-picker>
```

## Focus Indicator (forge-focus-indicator)

```html
<div style="position: relative;">
  <button id="the-button">Focusable Button</button>
  <forge-focus-indicator target="the-button"></forge-focus-indicator>
</div>
```

## Icon (forge-icon)

```html
<forge-icon name="home"></forge-icon>

<!-- Use external if you need to load the icon dynamically -->
<forge-icon name="settings" external></forge-icon>
```

## Icon Button (forge-icon-button)

```html
<forge-icon-button aria-label="Favorite">
  <forge-icon name="favorite"></forge-icon>
</forge-icon-button>

<!-- If you need to toggle between states -->
<forge-icon-button toggle>
  <forge-icon name="favorite_border"></forge-icon>
  <forge-icon name="favorite" slot="on"></forge-icon>
</forge-icon-button>
```

## Inline Message (forge-inline-message)

```html
<forge-inline-message theme="success">
  <forge-icon name="check_circle" slot="icon"></forge-icon>
  Success message
</forge-inline-message>
```

## Key (forge-key)

```html
<forge-key>
  <forge-key-item color="#ff5722">Series 1</forge-key-item>
  <forge-key-item color="#2196f3">Series 2</forge-key-item>
  <forge-key-item color="#4caf50">Series 3</forge-key-item>
</forge-key>
```

## Key Item (forge-key-item)

```html
<forge-key-item color="#ff5722">Data Series</forge-key-item>
```

## Keyboard Shortcut (forge-keyboard-shortcut)

```html
<forge-keyboard-shortcut key="ctrl+s"></forge-keyboard-shortcut>
```

## Label (forge-label)

```html
<forge-label for="text-input">Label Text</forge-label>
<input type="text" id="text-input">
```

## Label Value (forge-label-value)

```html
<forge-label-value>
  <span slot="label">Name</span>
  <span slot="value">John Doe</span>
</forge-label-value>
```

## Linear Progress (forge-linear-progress)

```html
<forge-linear-progress></forge-linear-progress>
<forge-linear-progress determinate progress="0.65"></forge-linear-progress>
```

## List (forge-list)

```html
<!-- Static list -->
<forge-list>
  <forge-list-item>
    <forge-icon name="inbox" slot="start"></forge-icon>
    Inbox
    <forge-badge slot="end">5</forge-badge>
  </forge-list-item>
  <forge-list-item>
    <forge-icon name="drafts" slot="start"></forge-icon>
    Drafts
  </forge-list-item>
</forge-list>

<!-- Interactive list -->
<forge-list>
  <forge-list-item>
    <button type="button">List Item 1</button>
  </forge-list-item>
  <forge-list-item>
    <button type="button">List Item 2</button>
  </forge-list-item>
  <forge-list-item>
    <button type="button">List Item 3</button>
  </forge-list-item>
</forge-list>

<!-- For navigation menu lists -->
<forge-list>
  <forge-list-item>
    <a href="/home">Home</a>
    <forge-icon name="home" slot="end"></forge-icon>
  </forge-list-item>
  <forge-list-item>
    <a href="/settings">Settings</a>
    <forge-icon name="settings" slot="end"></forge-icon>
  </forge-list-item>
</forge-list>

<!-- Lists with expandable items -->
<forge-list>
  <forge-list-item>
    <forge-icon slot="start" name="code"></forge-icon>
    <button type="button" id="exp-li-1">List Item One</button>
    <forge-open-icon slot="end"></forge-open-icon>
    <forge-expansion-panel trigger="exp-li-1" slot="additional-content">
      <forge-list indented>
        <forge-list-item>
          <button type="button">List Item One</button>
        </forge-list-item>
        <forge-list-item>
          <button type="button">List Item Two</button>
        </forge-list-item>
        <forge-list-item>
          <button type="button">List Item Three</button>
        </forge-list-item>
      </forge-list>
    </forge-expansion-panel>
    <forge-divider role="presentation" slot="additional-content"></forge-divider>
  </forge-list-item>
</forge-list>
```

## List Item (forge-list-item)

```html
<forge-list-item>
  <forge-avatar text="JD" slot="start"></forge-avatar>
  <button>John Doe</button>
  <forge-icon name="chevron_right" slot="end"></forge-icon>
</forge-list-item>
```

## Menu (forge-menu)

```html
<forge-menu>
  <forge-button variant="outlined" slot="anchor">Open Menu</forge-button>
</forge-menu>

<script>
const menu = document.querySelector('forge-menu');

// Menus require JavaScript to set options
menu.options = [
  { label: 'Profile', value: 'profile' },
  { label: 'Settings', value: 'settings' },
  { label: 'Logout', value: 'logout' }
];
</script>
```

## Meter (forge-meter)

```html
<forge-meter value="0.7" min="0" max="1">
  <label for="meter">Capacity</label>
</forge-meter>
```

## Meter Group (forge-meter-group)

```html
<forge-meter-group max="100">
  <label slot="label" for="meter-group">Birds</label>
  <span slot="value">75%</span>
  <forge-meter value="25" theme="info" aria-label="Peregrine"></forge-meter>
  <forge-meter value="35" theme="secondary" aria-label="Collared Dove"></forge-meter>
  <forge-meter value="15" theme="success" aria-label="Golden Pheasant"></forge-meter>
</forge-meter-group>
```

## Mini Drawer (forge-mini-drawer)

```html
<forge-mini-drawer>
  <forge-list navlist>
    <forge-list-item selected id="tooltip-host-1">
      <forge-tooltip anchor="tooltip-host-1">Inbox</forge-tooltip>
      <forge-icon slot="leading" name="inbox"></forge-icon>
      <button>Inbox</button>
    </forge-list-item>
    <forge-list-item id="tooltip-host-2">
      <forge-tooltip anchor="tooltip-host-2">Sent</forge-tooltip>
      <forge-icon slot="leading" name="send"></forge-icon>
      <button>Outgoing</button>
    </forge-list-item>
    <forge-list-item id="tooltip-host-3">
      <forge-tooltip anchor="tooltip-host-3">Drafts</forge-tooltip>
      <forge-icon slot="leading" name="drafts"></forge-icon>
      <button>Drafts</button>
    </forge-list-item>
  </forge-list>
</forge-mini-drawer>
```

## Modal Drawer (forge-modal-drawer)

```html
<forge-modal-drawer>
  <forge-list navlist>
    <forge-list-item selected>
      <forge-icon slot="leading" name="inbox"></forge-icon>
      Inbox
    </forge-list-item>
    <forge-list-item>
      <forge-icon slot="leading" name="send"></forge-icon>
      Outgoing
    </forge-list-item>
    <forge-list-item>
      <forge-icon slot="leading" name="drafts"></forge-icon>
      Drafts
    </forge-list-item>
    <forge-list-item>
      <forge-icon slot="leading" name="send"></forge-icon>
      Sent
    </forge-list-item>
  </forge-list>
</forge-modal-drawer>
```

## Open Icon (forge-open-icon)

```html
<forge-open-icon></forge-open-icon>
```

## Option (forge-option)

```html
<forge-option value="value1">Option 1</forge-option>
```

## Option Group (forge-option-group)

```html
<forge-option-group label="Group Label">
  <forge-option value="option1">Option 1</forge-option>
  <forge-option value="option2">Option 2</forge-option>
</forge-option-group>
```

## Overlay (forge-overlay)

```html
<button id="button">Anchor Button</button>

<forge-overlay anchor="button">
  <div>Overlay content</div>
</forge-overlay>
```

## Page State (forge-page-state)

```html
<forge-page-state>
  <img src="https://cdn.forge.tylertech.com/v1/images/spot-hero/404-error-spot-hero.svg" slot="graphic" alt="" />
  <div slot="title">Nothing but tumbleweeds here...</div>
  <div slot="message">Even our best explorer couldn't find the page you're looking for. It might have been removed or you may have mistyped the URL.</div>
  <forge-button variant="raised" slot="action">Go back</forge-button>
  <forge-button variant="outlined" slot="action">Refresh</forge-button>
</forge-page-state>
```

## Paginator (forge-paginator)

```html
<forge-paginator page-size="10" total="100" page-index="0"></forge-paginator>
```

## Popover (forge-popover)

```html
<button id="trigger">Show Popover</button>

<forge-popover anchor="trigger">
  <div>Popover content</div>
</forge-popover>
```

## Radio (forge-radio)

```html
<forge-radio-group>
  <forge-label legend>Choose an option</forge-label>
  <forge-radio name="default">Option 1</forge-radio>
  <forge-radio name="default">Option 2</forge-radio>
  <forge-radio name="default">Option 3</forge-radio>
</forge-radio-group>
```

## Scaffold (forge-scaffold)

```html
<!-- Typical page layout -->
<forge-scaffold>
  <forge-app-bar slot="header" title-text="App Title"></forge-app-bar>
  <forge-drawer slot="start">Drawer Content Here</forge-drawer>
  <main slot="body">Main Content Here</main>
  <footer slot="footer">Footer Content Here</footer>
</forge-scaffold>

<!-- Can be used within sub-pages, dialogs, or within other scaffold slots -->
<forge-scaffold>
  <forge-toolbar slot="header">
    <h2 class="forge-typography--heading4" slot="start">Subpage Title</h2>
  </forge-toolbar>
  <div slot="body">Subpage Content Here</div>
</forge-scaffold>
```

## Select (forge-select)

The select component uses a native `change` event to notify of selection changes, so you can listen for it like this:

```javascript
const select = document.querySelector('forge-select');
select.addEventListener('change', (event) => {
  console.log('Selected value:', event.target.value);
});
```

```html
<forge-select>
  <forge-option value="option1">Option 1</forge-option>
  <forge-option value="option2">Option 2</forge-option>
</forge-select>
```

## Select Dropdown (forge-select-dropdown)

```html
<forge-button variant="raised">
  <span aria-live="assertive" aria-atomic="true">Choose...</span>
  <forge-icon slot="end" name="arrow_drop_down"></forge-icon>
</forge-button>
<forge-select-dropdown target="#select-dropdown-target" sync-selected-text selected-text-target="#select-dropdown-text">
  <forge-option value="option1">Option 1</forge-option>
  <forge-option value="option2">Option 2</forge-option>
</forge-select-dropdown>
```

## Skeleton (forge-skeleton)

```html
<forge-skeleton avatar></forge-skeleton>
<forge-skeleton text></forge-skeleton>
<forge-skeleton text></forge-skeleton>
<forge-skeleton text style="width: 75%;"></forge-skeleton>
```

## Skip Link (forge-skip-link)

```html
<forge-skip-link href="main">Skip to main content</forge-skip-link>
```

## Slider (forge-slider)

```html
<forge-slider></forge-slider>
```

## Split Button (forge-split-button)

```html
<forge-split-button>
  <forge-button>Primary Action</forge-button>
  <forge-menu>
    <forge-button aria-label="Show menu" popover-icon></forge-button>
  </forge-menu>
</forge-split-button>
```

## Split View (forge-split-view)

```html
<forge-split-view>
  <forge-split-view-panel>
    <div>Panel 1 Content</div>
  </forge-split-view-panel>
  <forge-split-view-panel>
    <div>Panel 2 Content</div>
  </forge-split-view-panel>
</forge-split-view>
```

## Stack (forge-stack)

```html
<!-- Use the stack component SPARINGLY for situations that need it. DO NOT OVERUSE FOR GENERAL LAYOUT PURPOSES. -->
<forge-stack inline>
  <forge-button>Button 1</forge-button>
  <forge-button>Button 2</forge-button>
  <forge-button>Button 3</forge-button>
</forge-stack>
```

## State Layer (forge-state-layer)

```html
<div style="position: relative;">
  <button>Interactive Element</button>
  <forge-state-layer></forge-state-layer>
</div>
```

## Step (forge-step)

```html
<forge-step>
  <span>Step Two</span>
  <span slot="optional">Alternate Message</span>
</forge-step>
```

## Stepper (forge-stepper)

```html
<forge-stepper>
  <forge-step>Step 1</forge-step>
  <forge-step>Step 2</forge-step>
  <forge-step>Step 3</forge-step>
</forge-stepper>
```

## Switch (forge-switch)

```html
<forge-switch aria-label="Active">
  <span>off/on</span>
</forge-switch>
```

## Tab (forge-tab)

```html
<forge-tab>
  <forge-icon slot="leading" name="icon_name"></forge-icon>
  <span>Label</span>
</forge-tab>
```

## Tab Bar (forge-tab-bar)

```html
<forge-tab-bar active-tab="0">
  <forge-tab>Tab one</forge-tab>
  <forge-tab>Tab two</forge-tab>
  <forge-tab>Tab three</forge-tab>
  <forge-tab>Tab four</forge-tab>
</forge-tab-bar>
```

## Table (forge-table)

```html
<!-- Tables DO NOT have children. It is rendered for you by providing `data` and `columnConfigurations` arrays.-->
<forge-table></forge-table>

<script>
const table = document.querySelector('forge-table');
table.data = [
  { name: 'John Doe', age: 30, email: 'john@example.com' },
  { name: 'Jane Smith', age: 25, email: 'jane@example.com' }
];
table.columnConfigurations = [
  { property: 'name', header: 'Name' },
  { property: 'age', header: 'Age' },
  { property: 'email', header: 'Email' }
];
</script>

## Text Field (forge-text-field)

```html
<forge-text-field>
  <label for="my-text-field">Text Field Label</label>
  <input id="my-text-field" type="text" placeholder="Enter text..." />
</forge-text-field>

<forge-text-field>
  <label for="my-textarea">Textarea Label</label>
  <textarea id="my-textarea" placeholder="Enter text..."></textarea>
</forge-text-field>
```

## Time Picker (forge-time-picker)

```html
<forge-time-picker>
  <forge-text-field>
    <label for="time-picker-input">Choose time</label>
    <input type="text" id="time-picker-input" />
  </forge-text-field>
</forge-time-picker>
```

## Toast (forge-toast)

```html
<!-- Toasts can be used inline, and toggle their open property programmatically -->
<forge-toast>Toast Message</forge-toast>

<!-- BUT it's typically more common to create them dynamically and add them to the DOM when needed -->
<script>
const toast = document.createElement('forge-toast');
toast.textContent = 'Toast Message';
document.body.appendChild(toast);
toast.open = true;

// Toasts will auto-dismiss after a timeout, or can be dismissed via user action
</script>
```

### Angular Usage
It's common to use the `ToastService` from `@tylertech/forge-angular` to show toasts programmatically.

## Toolbar (forge-toolbar)

```html
<forge-toolbar>
  <h1 slot="start" class="forge-typography--heading4">Page Title</h1>
  <forge-icon-button slot="end">Action</forge-icon-button>
</forge-toolbar>
```

## Tooltip (forge-tooltip)

```html
<!-- Auto-attaches to its previous element sibling -->
<forge-button variant="raised">Hover me</forge-button>
<forge-tooltip>Tooltip text here</forge-tooltip>

<!-- Tooltips can also be used with other elements -->
<button id="tooltip-target">Hover me</button>
<forge-tooltip anchor="tooltip-target">Tooltip text here</forge-tooltip>
```

## View Switcher (forge-view-switcher)

```html
<forge-view-switcher>
  <forge-view>
    <h2>View 1</h2>
  </forge-view>
  <forge-view>
    <h2>View 2</h2>
  </forge-view>
</forge-view-switcher>

<script>
const viewSwitcher = document.querySelector('forge-view-switcher');
viewSwitcher.index = 1; // Switch to second view
</script>
```

## Busy Indicator (forge-busy-indicator) Extended Component

Busy indicators are typically shown and hidden programmatically via JavaScript.

If using Angular, prefer the use of the `BusyIndicatorService` from `@tylertech/forge-extended-angular` to show and hide busy indicators.

If using inline via HTML, you can toggle the `open` property via JavaScript like so:

```html
<forge-button variant="raised">Show Busy Indicator</forge-button>
<forge-busy-indicator></forge-busy-indicator>
```

## Confirmation Dialog (forge-confirmation-dialog) Extended Component

Confirmation dialogs are typically shown programmatically via JavaScript.

If using Angular, prefer the use of the `ConfirmationDialogService` from `@tylertech/forge-extended-angular` to show confirmation dialogs.

If using inline via HTML, you can set the dialog content via slots and toggle the `open` property via JavaScript like so:

```html
<forge-button variant="raised">Show Confirmation Dialog</forge-button>
<forge-confirmation-dialog>
  <span slot="title">Delete selected images?</span>
  <span slot="message">Images will be permanently removed from your account and all synced devices.</span>
  <span slot="secondary-button-text">No</span>
  <span slot="primary-button-text">Yes</span>
</forge-confirmation-dialog>
```

## Multi-Select Header (forge-multi-select-header) Extended Component

```html
<forge-multi-select-header>
  <span slot="select-all-button-text">Select All</span>
  <forge-icon-button slot="actions" aria-label="Select all items">
    <forge-icon name="download"></forge-icon>
  </forge-icon-button>
  <forge-icon-button slot="actions" aria-label="Clear selection">
    <forge-icon name="delete"></forge-icon>
  </forge-icon-button>
  <forge-menu slot="actions">
    <forge-icon-button aria-label="More actions">
      <forge-icon name="more_vert"></forge-icon>
    </forge-icon-button>
  </forge-menu>
</forge-multi-select-header>
```

## Quantity Field (forge-quantity-field) Extended Component

```html
<forge-quantity-field>
  <label slot="label" for="quantity">Quantity</label>
  <input id="quantity" type="number" value="1" aria-label="Set a quantity" step="2">
  <span slot="support-text">Enter a quantity</span>
</forge-quantity-field>
```

## Responsive Toolbar (forge-responsive-toolbar) Extended Component

```html
<forge-responsive-toolbar>
  <forge-icon-button aria-label="Icon button demo" slot="before-start">
    <forge-icon name="arrow_back" external></forge-icon>
  </forge-icon-button>
  <div slot="start" class="title forge-typography--heading4">User management</div>
  <forge-stack inline alignment="center" slot="end-large">
    <forge-button variant="text">Add User </forge-button> 
    <forge-button variant="outlined">Remove User</forge-button> 
    <forge-button variant="raised">Third action</forge-button> 
  </forge-stack>
  <div slot="end-small">
    <forge-menu id="example-menu">
      <forge-icon-button aria-label="Open menu">
        <forge-icon name="more_vert" external></forge-icon>
      </forge-icon-button>
    </forge-menu>
  </div>
</forge-responsive-toolbar>
```
