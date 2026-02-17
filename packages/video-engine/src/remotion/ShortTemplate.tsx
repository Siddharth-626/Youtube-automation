import { AbsoluteFill, Audio, Sequence, staticFile, useCurrentFrame, interpolate } from 'remotion';

type Props = {
  clips: string[];
  captions: string[];
  audio: string;
  title: string;
};

export const ShortTemplate = ({ clips, captions, audio, title }: Props) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1]);

  return (
    <AbsoluteFill style={{ backgroundColor: 'black' }}>
      <Audio src={staticFile(audio)} />
      {clips.map((clip, i) => (
        <Sequence key={clip} from={i * 60} durationInFrames={60}>
          <AbsoluteFill
            style={{
              backgroundImage: `url(${clip})`,
              backgroundSize: 'cover',
              justifyContent: 'flex-end',
              padding: 40
            }}
          >
            <h1 style={{ color: 'white', fontSize: 56, fontWeight: 800, opacity }}>{title}</h1>
            <p style={{ color: 'white', fontSize: 44, fontWeight: 700 }}>{captions[i] || ''}</p>
          </AbsoluteFill>
        </Sequence>
      ))}
    </AbsoluteFill>
  );
};
