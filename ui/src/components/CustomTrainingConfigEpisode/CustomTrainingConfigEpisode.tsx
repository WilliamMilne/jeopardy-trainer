import { ClickableTile, SelectableTile } from 'carbon-components-react';
import React, { useEffect, useState } from 'react';
import { Category, Episode } from '../../generated/graphql';
import styles from './CustomTrainingConfigEpisode.module.scss';

interface ICustomTrainingConfigEpisodeProps {
  episode: Episode
}

export default function CustomTrainingConfigEpisode(props: ICustomTrainingConfigEpisodeProps) {
  const { episode } = props;
  const [clicked, setClicked] = useState(false);
  const [selectedCategoryList, setSelectedCategoryList] = useState([])

  const categories = (
    episode.categories.map((category: Category) => {
      return <SelectableTile value={category.id} key={`category-${category.id}`} onChange={(e) => {
  
        console.log(e.target);
      }}>
        {category.name}
      </SelectableTile>
    })
  )
  
  return (
    <div>
      <ClickableTile id={`episode-${episode.id}`} onClickCapture={() => {setClicked(!clicked)}}>
        {episode.name}
      </ClickableTile>
      {clicked ? <div aria-label="selectable tiles" role="group">{categories}</div> : undefined}
    </div>
  );
};
