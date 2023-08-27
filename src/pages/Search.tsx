import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import IconButton from "../components/IconButton";
import {
  faHeadphones,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useSearchEpisodes } from "../hooks/useSearchEpisodes";
import getYoutubeThumbnail from "../utils/getYoutubeThumbnail";
import Container from "../components/Container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface SearchEpisodesForm {
  keyword: string;
}

const Search = () => {
  const { register, handleSubmit } = useForm<SearchEpisodesForm>();

  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");

  const { data } = useSearchEpisodes(query ?? "");

  const navigate = useNavigate();

  const onSubmit = (data: SearchEpisodesForm) => {
    const { keyword } = data;
    navigate(`/search?q=${keyword}`);
  };

  const moveToEpisode = (episodeId: number) =>
    navigate(`/episodes/${episodeId}`);

  return (
    <Container>
      <SearchForm onSubmit={handleSubmit(onSubmit)}>
        <SearchInput
          autoFocus
          type="text"
          placeholder="검색어를 입력해주세요."
          {...register("keyword")}
        />
        <SearchIconBox>
          <IconButton icon={faMagnifyingGlass} type="submit" />
        </SearchIconBox>
      </SearchForm>

      {data && (
        <TotalCount>
          검색결과 총 <em>{data?.searchEpisodes.totalCount}</em>개
        </TotalCount>
      )}

      {(!data || data.searchEpisodes.totalCount === 0) && (
        <Greeting>
          <FontAwesomeIcon icon={faHeadphones} size="5x" color="#845EF7" />
          <div className="message">오늘은 어떤 ASMR을 들어볼까요?</div>
        </Greeting>
      )}

      <EpisodeList>
        {data?.searchEpisodes.episodes?.map((episode) => (
          <EpisodeItem
            key={episode.id}
            onClick={() => moveToEpisode(episode.id)}
          >
            <Thumbnail>
              <img
                src={getYoutubeThumbnail(episode.youtubeId)}
                alt={episode.title}
              />
            </Thumbnail>
            <Info>
              <div className="title">{episode.title}</div>
              <div className="meta">
                <span className="createdAt">
                  {episode.createdAt.substr(0, 10)}
                </span>
              </div>
              <div className="description">{episode.description}</div>
            </Info>
          </EpisodeItem>
        ))}
      </EpisodeList>
    </Container>
  );
};

export default Search;

const SearchForm = styled.form`
  width: 100%;
  max-width: 640px;
  align-self: center;
  display: flex;
  margin-bottom: 30px;
  position: relative;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 16px;
  background: ${({ theme }) => theme.surface};
  border-radius: 10px;
  caret-color: ${({ theme }) => theme.primary};

  &:focus {
    outline: ${({ theme }) => `1px solid ${theme.primary}`};
  }
`;

const SearchIconBox = styled.div`
  position: absolute;
  right: 10px;
  top: 0;
  bottom: 0;
  margin: auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Greeting = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  row-gap: 30px;
  padding: 60px 0;

  .message {
    color: ${({ theme }) => theme.textInvertedColor};
  }
`;

export const TotalCount = styled.span`
  em {
    font-family: "pretendard600";
    font-size: 18px;
    color: ${({ theme }) => theme.primary};
    letter-spacing: 2px;
  }
`;

const EpisodeList = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: 20px;
  row-gap: 40px;
  margin-top: 30px;
  margin-bottom: 60px;

  @media screen and (max-width: 640px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

const EpisodeItem = styled.li`
  background: ${({ theme }) => theme.surface};
  border-radius: 10px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  cursor: pointer;
`;

const Thumbnail = styled.div`
  width: 100%;

  img {
    width: 100%;
    display: block;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  row-gap: 10px;

  .title {
    font-size: 18px;
    font-family: "pretendard600";
    --max-lines: 2;
    display: -webkit-box;
    -webkit-line-clamp: var(--max-lines);
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .meta {
    color: ${({ theme }) => theme.textInvertedColor};
    font-size: 12px;
  }

  .description {
    color: ${({ theme }) => theme.textInvertedColor};
    font-size: 14px;
    line-height: 1.5;
    --max-lines: 2;
    display: -webkit-box;
    -webkit-line-clamp: var(--max-lines);
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`;
