import { ScrollView, View, Navigator, Image, Text } from "@tarojs/components";
import "./index.less";

export const ShowcaseBook = ({ books }) => {
  return (
    <ScrollView scrollX={true} className="showcase-container">
      <View className="showcase">
        {books.length &&
          books.map((item) => {
            return (
              <Navigator
                url={`/pages/book-detail/book-detail?id=${item.id}`}
                className="showcase__item"
                hoverClass="ui--active"
              >
                <Image
                  className="showcase__item-image--book"
                  src={`${item.imgs.small}`}
                  mode="aspectFill"
                />
                <View className="font-black-30  ellipsis ">{item.title}</View>
                <View className="font-gray-28 ellipsis">
                  {item.author.map((author) => {
                    return (
                      <Text key={author} className="ui-book-card__info-name">
                        {author}
                      </Text>
                    );
                  })}
                </View>
              </Navigator>
            );
          })}
      </View>
    </ScrollView>
  );
};

export const ShowcaseBooklist = ({ booklists }) => {
  return (
    <ScrollView scrollX className="showcase-container">
      <View className="showcase">
        {booklists.map((item) => {
          return (
            <Navigator
              url={`/pages/booklist/children/booklist-detail?id=${item.id}`}
              className="showcase__item"
              hoverClass="ui--active"
            >
              <Image
                className="showcase__item-image--booklist"
                src={`${item.image || "/images/icon_empty_booklist.png"}`}
                mode="aspectFill"
              />
              <View className="font-black-30 ellipsis-l2">{item.title}</View>
            </Navigator>
          );
        })}
      </View>
    </ScrollView>
  );
};
