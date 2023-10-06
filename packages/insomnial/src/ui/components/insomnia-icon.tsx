import React from 'react';
import styled, { keyframes } from 'styled-components';

import { useAIContext } from '../context/app/ai-context';

const SlideInLeftKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateX(-100%);
  }

  100% {
    opacity: 1;
    transform: translateX(0);
  }
`;

const FadeInKeyframes = keyframes`
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
`;

const Layout = styled.div({
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--padding-xs)',
  paddingLeft: '11px',
  position: 'relative',
});

const RelativeFrame = styled.div({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--padding-xs)',
});

const AILoadingText = styled.div`
  display: flex;
  z-index: 1;
  align-items: center;
  height: 100%;
  font-size: var(--font-size-small);
  color: var(--color-font);
  padding-right: var(--padding-sm);
  opacity: 0;
  animation: ${FadeInKeyframes} 0.1s 0.3s ease-out forwards;
`;

const LoadingBoundary = styled.div({
  display: 'flex',
  width: 'calc(100% + 4px)',
  height: 'calc(100% + 2px)',
  position: 'absolute',
  overflow: 'hidden',
  borderRadius: '60px',
});

const LoadingBar = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 60px;
  opacity: 0;
  animation: ${SlideInLeftKeyframes} 0.4s ease-out forwards;
`;

const LoadingBarIndicator = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: absolute;
  inset: 0;
  background-color: #7400e1;
  border-radius: 60px;
  opacity: 1;
  transform: translateX(-100%);
`;

export const InsomniaAILogo = ({
  ...props
}: React.SVGProps<SVGSVGElement>) => {
  const {
    generating: loading,
    progress,
  } = useAIContext();

  const loadingProgress = 100 - (progress.progress / progress.total) * 100;

  return (
    <Layout>
      <RelativeFrame>
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="16.000000pt"
          height="16.000000pt"
          viewBox="0 0 16.000000 16.000000"
          preserveAspectRatio="xMidYMid meet"
          {...props}
        >

          <g
            transform="translate(0.000000,16.000000) scale(0.100000,-0.100000)"
            fill="#999999"
            stroke="none"
          >
            <path
              d="M14 147 c-3 -8 -4 -43 -2 -78 l3 -64 65 0 65 0 0 75 0 75 -63 3 c-46
2 -64 -1 -68 -11z m97 -18 c15 -15 19 -30 17 -62 -3 -40 -5 -42 -36 -45 -47
-5 -68 4 -53 22 8 10 9 16 1 21 -16 10 -12 43 10 65 25 25 35 25 61 -1z"
            />
            <path d="M54 116 c-10 -26 4 -48 28 -44 32 4 32 52 0 56 -13 2 -25 -3 -28 -12z"/>
          </g>
        </svg>
        {loading && <LoadingBoundary>
          <LoadingBar />
          <LoadingBarIndicator
            style={{
              opacity: progress.progress === 0 || progress.total === progress.progress ? 0 : 1,
              transform: `translateX(-${loadingProgress}%)`,
            }}
          />
        </LoadingBoundary>
        }
        {loading && (
          <AILoadingText>
            <span>{'AI is thinking...'}</span>
          </AILoadingText>
        )}
      </RelativeFrame>
    </Layout>
  );
};
