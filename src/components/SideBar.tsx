import { useEffect, useState } from 'react';
import { Button } from './Button';

import { api } from '../services/api';
interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface SideBarProps {
  childSelectedGenreId: number;
  childSetSelectedGenreId(number: number): any;
}

export function SideBar({ childSelectedGenreId, childSetSelectedGenreId }: SideBarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);
  // const [selectedGenreId, setSelectedGenreId] = useState(1);


  useEffect(() => {
    api.get<GenreResponseProps[]>('genres').then(response => {
      setGenres(response.data);
    });
  }, []);

  function handleClickButton(id: number) {
    childSetSelectedGenreId(id);
  }

  return (
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={childSelectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}