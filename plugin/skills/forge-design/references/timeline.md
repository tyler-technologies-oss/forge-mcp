# Timeline

**In this file:**
- [Basic Usage](#basic-usage)
- [Markers](#markers)
- [Details](#details)
- [Timeline break](#timeline-break)
- [Theming](#theming)
- [Timestamps](#timestamps)
- [Sidebar Control](#sidebar-control)
- [Notes](#notes)

Timelines display a list of events in chronological order. Use `<forge-timeline>` as the container and `<forge-timeline-item>` for each event.

## Basic Usage

```html
  <forge-timeline>
    <forge-timeline-item>Project kickoff meeting completed</forge-timeline-item>
    <forge-timeline-item>Initial design mockups reviewed</forge-timeline-item>
    <forge-timeline-item>API endpoints finalized</forge-timeline-item>
    <forge-timeline-item>Code review session</forge-timeline-item>
  </forge-timeline>
```

## Markers

Timeline items display a default circular marker when no custom marker is provided. The marker can be customized by providing content in the marker slot, such as icons or badges.

```html
  <forge-timeline>
    <forge-timeline-item>
      <forge-icon slot="marker" name="check_circle"></forge-icon>
      <span>Feature deployment completed successfully</span>
    </forge-timeline-item>
    <forge-timeline-item>
      <forge-icon slot="marker" name="schedule"></forge-icon>
      <span>Scheduled maintenance at 3:00 PM</span>
    </forge-timeline-item>
    <forge-timeline-item>
      <forge-icon slot="marker" name="star"></forge-icon>
      <span>Product launch</span>
    </forge-timeline-item>
  </forge-timeline>
```

## Details

Use the detail slot of a timeline item to provide additional information or context for the event. Consider using card component to visually group and separate detail content from the item's summary.

```html
    <forge-timeline>
      <forge-timeline-item theme="success">
        <forge-icon slot="marker" name="check_circle"></forge-icon>
        <strong>Deployment Successful</strong>
        <forge-card slot="detail">
          <div>Version 2.0.0 has been successfully deployed to production. All services are running normally and health checks are passing.</div>
          <div style="margin-top: 8px; display: flex; gap: 8px;">
            <forge-badge>Production</forge-badge>
            <forge-badge theme="success">v2.0.0</forge-badge>
          </div>
        </forge-card>
      </forge-timeline-item>
      <forge-timeline-item>
        <forge-icon slot="marker" name="schedule"></forge-icon>
        <strong>Maintenance Scheduled</strong>
        <div slot="detail">Database migration scheduled for tonight at 2:00 AM EST. Expected downtime: 30 minutes.</div>
      </forge-timeline-item>
      <forge-timeline-item>
        <strong>Code Review Completed</strong>
        <div slot="detail">Pull request #456 has been reviewed and approved by 3 team members.</div>
      </forge-timeline-item>
    </forge-timeline>
```

## Timeline break

Use the `<forge-timeline-break>` component to provide visual separation between non-sequential groups of timeline items.

```html
    <forge-timeline>
      <forge-timeline-item>
        <span>Recent Activity</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <span>Code Review</span>
      </forge-timeline-item>
      <forge-timeline-break></forge-timeline-break>
      <forge-timeline-item>
        <span>Previous Activity</span>
      </forge-timeline-item>
      <forge-timeline-item>
        <span>Initial Commit</span>
      </forge-timeline-item>
    </forge-timeline>
```

## Theming

Set the theme of a timeline item to control the color of the marker.


```html
    <forge-timeline>
      <forge-timeline-item theme="primary">
        <span>Primary</span>
      </forge-timeline-item>
      <forge-timeline-item theme="success">
        <span>Success</span>
      </forge-timeline-item>
      <forge-timeline-item theme="warning">
        <span>Warning</span>
      </forge-timeline-item>
      <forge-timeline-item theme="error">
        <span>Error</span>
      </forge-timeline-item>
      <forge-timeline-item theme="info">
        <span>Info</span>
      </forge-timeline-item>
    </forge-timeline>
```

## Timestamps

The `<forge-timestamp>` component can be used to display a timestamp in a timeline. Timestamps placed as a direct child of a timeline display as a heading alongside the timeline items. Placing a timestamp within a timeline item renders it as body text.

```html
    <forge-timeline>
      <forge-timestamp datetime="2024-03-15"></forge-timestamp>
      <forge-timeline-item>
        <span>Timestamp after</span>
        <forge-timestamp datetime="2024-03-15T14:30:00" format="HH:mm" separator="start"></forge-timestamp>
      </forge-timeline-item>
      <forge-timeline-item>
        <forge-timestamp datetime="2024-03-15T12:15:00" format="HH:mm" separator="end"></forge-timestamp>
        <span>Timestamp before</span>
      </forge-timeline-item>
      <forge-timestamp datetime="2024-03-14"></forge-timestamp>
      <forge-timeline-item>
        <span>No timestamp separator</span>
        <forge-timestamp datetime="2024-03-14T16:45:00" format="HH:mm"></forge-timestamp>
      </forge-timeline-item>
      <forge-timeline-item>
        <span>Timestamp in detail</span>
        <div slot="detail">Posted at <forge-timestamp slot="detail" datetime="2024-03-14T16:45:00" format="HH:mm"></forge-timestamp></div>
      </forge-timeline-item>
    </forge-timeline>
```

## Sidebar Control

The `sidebar` attribute controls which parts of the connecting line appear on an item. Values: `auto` (default), `start`, `end`, `both`, `none`. Useful for isolating the first/last item or breaking the line manually.

```html
<forge-timeline>
  <forge-timeline-item sidebar="end">First event</forge-timeline-item>
  <forge-timeline-item>Middle event</forge-timeline-item>
  <forge-timeline-item sidebar="start">Last event</forge-timeline-item>
</forge-timeline>
```

## Notes

- `<forge-timeline>` is a layout container — put `<forge-timeline-item>` and optional `<forge-timeline-break>` children in the default slot.
- Every timeline item renders a default dot marker unless a custom marker is provided via the `marker` slot.
- Use `theme` on an item to semantically color the default marker; use the `marker` slot when you need an icon or richer visual.
- The connecting line between items is drawn automatically — override individual items with `sidebar` only when the default is wrong (e.g. mid-timeline manual break).
- For long timestamps or metadata, put the timestamp in `slot="start"` so it aligns consistently across items.
