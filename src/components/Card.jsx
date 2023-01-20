import React from "react";

export default function Card(props) {
  console.log(props);
  const {
    postGroup,
    url,
    postFeaturedMedia,
    postFeaturedMediaAlt,
    title,
    authorLink,
    authorName,
    postType,
    timeStamp,
  } = props;

  return (
    <div className="col-4 col-small-12 col-medium-3 p-card--highlighted post-card u-equal-height">
      <h1 className="post-card__heading font-weight-regular-text">
        {postGroup}
      </h1>
      <div class="u-no-padding post-card__content">
        <img
          class="p-card__image"
          alt={postFeaturedMediaAlt}
          src={postFeaturedMedia}
        />
        <div class="p-card__inner u-equal-height">
          <h3>
            <a href={url}>{title}</a>
          </h3>
          <p>
            <em>
              By <a href={authorLink}>{authorName}</a> on {timeStamp}
            </em>
          </p>
        </div>
        <hr class="u-no-margin--bottom" />
        <div class="p-card__inner">{postType} </div>
      </div>
    </div>
  );
}
