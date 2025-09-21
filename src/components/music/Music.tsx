import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Music as MusicIcon, 
  Play, 
  Pause, 
  SkipForward, 
  SkipBack,
  Volume2,
  Heart,
  Shuffle,
  Repeat
} from "lucide-react";

interface Track {
  id: string;
  title: string;
  artist: string;
  duration: string;
  mood: string;
}

interface Playlist {
  id: string;
  name: string;
  mood: string;
  description: string;
  tracks: Track[];
  color: string;
}

const playlists: Playlist[] = [
  {
    id: "relax",
    name: "Relax Mix",
    mood: "relax",
    description: "Calming sounds to help you unwind",
    color: "bg-blue-100 text-blue-800",
    tracks: [
      { id: "1", title: "Evening Calm", artist: "Peaceful Sounds", duration: "4:32", mood: "relax" },
      { id: "2", title: "Soft Instrumental 1", artist: "Ambient Collective", duration: "5:15", mood: "relax" },
      { id: "3", title: "Nature Flow", artist: "Forest Echoes", duration: "6:20", mood: "relax" },
      { id: "4", title: "Gentle Waves", artist: "Ocean Sounds", duration: "4:45", mood: "relax" },
      { id: "5", title: "Mountain Breeze", artist: "Nature's Symphony", duration: "5:02", mood: "relax" }
    ]
  },
  {
    id: "focus",
    name: "Focus Mix",
    mood: "focus",
    description: "Concentration music for productivity",
    color: "bg-purple-100 text-purple-800",
    tracks: [
      { id: "6", title: "Low Tempo Beats", artist: "Study Vibes", duration: "3:45", mood: "focus" },
      { id: "7", title: "Concentration Loop", artist: "Focus Flow", duration: "4:20", mood: "focus" },
      { id: "8", title: "Deep Work", artist: "Productivity Sounds", duration: "5:30", mood: "focus" },
      { id: "9", title: "Mind Flow", artist: "Cognitive Beats", duration: "4:12", mood: "focus" },
      { id: "10", title: "Study Session", artist: "Learning Lounge", duration: "6:45", mood: "focus" }
    ]
  },
  {
    id: "happy",
    name: "Happy Mix",
    mood: "happy",
    description: "Uplifting tracks to boost your mood",
    color: "bg-yellow-100 text-yellow-800",
    tracks: [
      { id: "11", title: "Uplift Pop Lite", artist: "Sunshine Collective", duration: "3:22", mood: "happy" },
      { id: "12", title: "Sunrise Vibes", artist: "Morning Glory", duration: "4:10", mood: "happy" },
      { id: "13", title: "Good Energy", artist: "Positive Waves", duration: "3:55", mood: "happy" },
      { id: "14", title: "Bright Day", artist: "Cheerful Sounds", duration: "4:30", mood: "happy" },
      { id: "15", title: "Joy Ride", artist: "Happy Trails", duration: "3:40", mood: "happy" }
    ]
  },
  {
    id: "sleep",
    name: "Sleep Mix",
    mood: "sleep",
    description: "Peaceful sounds for better sleep",
    color: "bg-indigo-100 text-indigo-800",
    tracks: [
      { id: "16", title: "Slow Ambient 1", artist: "Sleep Sounds", duration: "8:30", mood: "sleep" },
      { id: "17", title: "White Noise Short", artist: "Night Comfort", duration: "10:00", mood: "sleep" },
      { id: "18", title: "Dreamland", artist: "Sleepy Hollow", duration: "7:20", mood: "sleep" },
      { id: "19", title: "Moonlight Serenade", artist: "Bedtime Stories", duration: "6:15", mood: "sleep" },
      { id: "20", title: "Peaceful Rest", artist: "Sleep Well", duration: "9:45", mood: "sleep" }
    ]
  }
];

export const Music = () => {
  const [selectedPlaylist, setSelectedPlaylist] = useState<Playlist | null>(null);
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  
  // Mock user's last mood for recommendations
  const lastMood = "calm";

  const getRecommendedPlaylist = () => {
    const moodMapping: { [key: string]: string } = {
      "calm": "relax",
      "stressed": "relax",
      "happy": "happy",
      "sad": "happy",
      "neutral": "focus"
    };
    
    const recommendedMood = moodMapping[lastMood] || "relax";
    return playlists.find(p => p.mood === recommendedMood) || playlists[0];
  };

  const playTrack = (track: Track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
    setCurrentTime(0);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    if (!selectedPlaylist || !currentTrack) return;
    
    const currentIndex = selectedPlaylist.tracks.findIndex(t => t.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % selectedPlaylist.tracks.length;
    playTrack(selectedPlaylist.tracks[nextIndex]);
  };

  const previousTrack = () => {
    if (!selectedPlaylist || !currentTrack) return;
    
    const currentIndex = selectedPlaylist.tracks.findIndex(t => t.id === currentTrack.id);
    const prevIndex = currentIndex === 0 ? selectedPlaylist.tracks.length - 1 : currentIndex - 1;
    playTrack(selectedPlaylist.tracks[prevIndex]);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Convert duration string to seconds for progress calculation
  const durationToSeconds = (duration: string) => {
    const [mins, secs] = duration.split(':').map(Number);
    return mins * 60 + secs;
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <MusicIcon className="h-5 w-5 text-primary" />
            <span>Wellness Music</span>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Recommendation */}
      {!selectedPlaylist && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Heart className="h-5 w-5 text-red-500" />
              <span>Recommended for You</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Based on your recent mood: {lastMood}</h3>
                  <p className="text-sm text-muted-foreground">We recommend the {getRecommendedPlaylist()?.name}</p>
                </div>
                <Button onClick={() => setSelectedPlaylist(getRecommendedPlaylist())}>
                  Play Now
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {!selectedPlaylist ? (
        /* Playlist Selection */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {playlists.map((playlist) => (
            <Card key={playlist.id} className="cursor-pointer hover:shadow-lg transition-shadow">
              <CardContent className="p-6" onClick={() => setSelectedPlaylist(playlist)}>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-lg">{playlist.name}</h3>
                    <Badge className={playlist.color}>{playlist.mood}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{playlist.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      {playlist.tracks.length} tracks
                    </span>
                    <Button size="sm" onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPlaylist(playlist);
                      playTrack(playlist.tracks[0]);
                    }}>
                      <Play className="h-4 w-4 mr-2" />
                      Play
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        /* Current Playlist View */
        <div className="space-y-6">
          {/* Now Playing */}
          {currentTrack && (
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold">{currentTrack.title}</h3>
                      <p className="text-muted-foreground">{currentTrack.artist}</p>
                    </div>
                    <Badge className={selectedPlaylist.color}>
                      {selectedPlaylist.mood}
                    </Badge>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="space-y-2">
                    <Progress 
                      value={isPlaying ? (currentTime / durationToSeconds(currentTrack.duration)) * 100 : 0} 
                      className="w-full"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{formatTime(currentTime)}</span>
                      <span>{currentTrack.duration}</span>
                    </div>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-center space-x-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsShuffled(!isShuffled)}
                      className={isShuffled ? "bg-primary text-primary-foreground" : ""}
                    >
                      <Shuffle className="h-4 w-4" />
                    </Button>
                    
                    <Button variant="outline" size="sm" onClick={previousTrack}>
                      <SkipBack className="h-4 w-4" />
                    </Button>
                    
                    <Button size="lg" onClick={togglePlayPause}>
                      {isPlaying ? (
                        <Pause className="h-6 w-6" />
                      ) : (
                        <Play className="h-6 w-6" />
                      )}
                    </Button>
                    
                    <Button variant="outline" size="sm" onClick={nextTrack}>
                      <SkipForward className="h-4 w-4" />
                    </Button>
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsRepeating(!isRepeating)}
                      className={isRepeating ? "bg-primary text-primary-foreground" : ""}
                    >
                      <Repeat className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Playlist Details */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{selectedPlaylist.name}</CardTitle>
                  <p className="text-muted-foreground">{selectedPlaylist.description}</p>
                </div>
                <div className="space-x-2">
                  <Button variant="outline" onClick={() => setSelectedPlaylist(null)}>
                    Back to Playlists
                  </Button>
                  {!currentTrack && (
                    <Button onClick={() => playTrack(selectedPlaylist.tracks[0])}>
                      <Play className="h-4 w-4 mr-2" />
                      Play All
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {selectedPlaylist.tracks.map((track, index) => (
                  <div
                    key={track.id}
                    className={`flex items-center justify-between p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors ${
                      currentTrack?.id === track.id ? 'bg-primary/10' : ''
                    }`}
                    onClick={() => playTrack(track)}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-muted-foreground w-6">
                        {index + 1}
                      </span>
                      <div>
                        <p className="font-medium">{track.title}</p>
                        <p className="text-sm text-muted-foreground">{track.artist}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-muted-foreground">{track.duration}</span>
                      {currentTrack?.id === track.id ? (
                        <Button size="sm" variant="ghost" onClick={(e) => {
                          e.stopPropagation();
                          togglePlayPause();
                        }}>
                          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                        </Button>
                      ) : (
                        <Button size="sm" variant="ghost" onClick={(e) => {
                          e.stopPropagation();
                          playTrack(track);
                        }}>
                          <Play className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};