import React from 'react'

import { sequenceUnits } from '../shared/config'

const IconPatterns = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" style={{ height: 0, width: 0 }}>
      <defs>
        {sequenceUnits.map(({ id }) => (
          <React.Fragment key={id}>
            <pattern
              id={`icon-${id}`}
              x="0"
              y="0"
              patternUnits="objectBoundingBox"
              preserveAspectRatio="xMidYMid meet"
              height="1"
              width="1"
            >
              <image
                x="0"
                y="0"
                height="80"
                width="80"
                xlinkHref={`assets/icons/${id}.png`}
              ></image>
            </pattern>
            <pattern
              id={`icon-${id}-for-expanded`}
              x="0"
              y="0"
              patternUnits="objectBoundingBox"
              preserveAspectRatio="xMidYMid meet"
              height="1"
              width="1"
            >
              <image
                x="0"
                y="0"
                height="60"
                width="60"
                xlinkHref={`assets/icons/${id}.png`}
              ></image>
            </pattern>
          </React.Fragment>
        ))}
      </defs>
    </svg>
  )
}

export default IconPatterns
