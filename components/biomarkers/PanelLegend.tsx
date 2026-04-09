'use client';

import { useCallback } from 'react';
import type { PanelDef } from './BiomarkersIndex';

interface PanelLegendProps {
  panels: PanelDef[];
  activePanelFilter: string | null;
  onPanelFilter: (color: string | null) => void;
}

export default function PanelLegend({
  panels,
  activePanelFilter,
  onPanelFilter,
}: PanelLegendProps) {
  const handleReset = useCallback(() => {
    onPanelFilter(null);
  }, [onPanelFilter]);

  const handleLegendClick = useCallback(
    (e: React.MouseEvent, color: string) => {
      e.preventDefault();
      e.stopPropagation();
      onPanelFilter(color);
    },
    [onPanelFilter]
  );

  return (
    <div id="bio_legend" className="bio_legend">
      <div className="bio_legend-title">
        Key
        {activePanelFilter && (
          <span
            className="bio_legend-reset"
            onClick={handleReset}
            style={{
              marginLeft: '0.5rem',
              fontSize: '0.8125rem',
              color: '#737373',
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
          >
            reset filters
          </span>
        )}
      </div>
      <div
        id="bio_legend-list"
        className={`bio_legend-list${activePanelFilter ? ' has-active' : ''}`}
      >
        {panels.map((panel) => (
          <div
            key={panel.id}
            data-panel-color={panel.id}
            className={`bio_legend-item${activePanelFilter === panel.id ? ' is-active' : ''}`}
            onClick={(e) => handleLegendClick(e, panel.id)}
            style={{ cursor: 'pointer' }}
          >
            <div className={`bio_legend-dot config_color-${panel.id}`} />
            <span>Included in {panel.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
