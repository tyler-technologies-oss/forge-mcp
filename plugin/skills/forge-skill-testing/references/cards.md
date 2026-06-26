# Card Rules

## Default Component

**Use `<forge-structured-card>` from `@tylertech/forge-extended` for all cards** unless explicitly told otherwise.

This component has header/body/footer structure, padding, and spacing built-in - no need for nested scaffolds or manual padding configuration.

---

## Import Rule

**ALWAYS use a side-effect import for `forge-structured-card`:**

```typescript
import '@tylertech/forge-extended/structured-card';
```

---

## Minimal Examples

```html
<forge-structured-card heading-level="2">
  <span slot="title">Card Title</span>
  <div slot="body">Card content goes here</div>
</forge-structured-card>
```

With a form:

```html
<forge-structured-card heading-level="2">
  <div slot="title">Project Details</div>
  <forge-badge theme="warning" slot="header-actions">
    <span>In progress</span>
    <forge-icon name="construction" slot="end"></forge-icon>
  </forge-badge>
  <form slot="body">
    <div class="space-y-medium">
      <forge-text-field label-position="block-start">
        <label>Project name</label>
        <input type="text">
      </forge-text-field>
      <forge-text-field label-position="block-start">
        <label>Description</label>
        <textarea></textarea>
      </forge-text-field>
      <forge-select label="Category" label-position="block-start" aria-label="Category">
        <forge-option value="development">Development</forge-option>
        <forge-option value="design">Design</forge-option>
        <forge-option value="marketing">Marketing</forge-option>
        <forge-option value="research">Research</forge-option>
      </forge-select>
      <forge-text-field label-position="block-start">
        <label>Owner</label>
        <input type="text">
      </forge-text-field>
      <forge-file-picker accept=".jpg,.png,.pdf">
        <forge-button variant="outlined">Attach files</forge-button>
      </forge-file-picker>
    </div>
  </form>
  <forge-button variant="text" slot="footer-secondary-action">
    <forge-icon slot="start" name="delete"></forge-icon>
    Cancel
  </forge-button>
  <forge-button variant="tonal" slot="footer-primary-action">
    <forge-icon slot="start" name="save"></forge-icon>
    Save
  </forge-button>
</forge-structured-card>
```

With header icon button
Use the after-header-actions slot for icon buttons that need to run up against the card edge, such as overflow menus or close buttons.

```html
  <forge-structured-card heading-level="2">
    <div slot="title">Project Details</div>
    <forge-menu slot="after-header-actions">
      <forge-icon-button aria-label="More actions">
        <forge-icon name="more_vert"></forge-icon>
      </forge-icon-button>
    </forge-menu>

    <div slot="body" class="card-content">
      Card content goes here
    </div>

    <forge-button variant="text" slot="footer-secondary-action">
      <forge-icon slot="start" name="delete"></forge-icon>
      Cancel
    </forge-button>
    <forge-button variant="filled" slot="footer-primary-action">
      <forge-icon slot="start" name="save"></forge-icon>
      Save
    </forge-button>
  </forge-structured-card>
```

---

## More Examples

To get card structure and usage code:
- Call `get_forge_blocks(component: "forge-structured-card")` to see real-world implementations
- Call `get_component_docs(component: "forge-structured-card", format: "usage-examples")` for component API examples

---

## Structure Rules

1. **Header action slots - CRITICAL distinction:**
   - `slot="after-header-actions"` - **ONLY for `<forge-icon-button>`** (overflow menus, close buttons, etc.)
   - `slot="header-actions"` - For everything else (badges, regular buttons, text)
2. **Use built-in slots** for card sections: `slot="title"`, `slot="body"`, `slot="footer-primary-action"`, `slot="footer-secondary-action"`
3. **Configure body padding** via `body-spacing` attribute (e.g., `body-spacing="none"`, `body-spacing="medium"`)
4. **Set heading level** via `heading-level` attribute for accessibility
5. **Use `<forge-divider>` for content separation** within the body - never CSS borders

---

## Typography Rules

**STRICT**: Card headers use `text-heading3` as default, **never larger**.

- `text-heading3`, `text-heading2`, `text-heading1` are allowed in cards
- `text-heading4` and `text-heading5` are **FORBIDDEN** in cards - reserved for PAGE-LEVEL titles only

---

## When to Use `<forge-card>`

Only use `<forge-card>` when explicitly requested or for very simple content containers without header/body/footer structure. In this case, check blocks with `get_forge_blocks(component: "forge-card")` for usage patterns.
