import _ from "lodash";
import React from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import { getCard } from "../../../utils";

import colors from "../../../resources/colors.json";

const PlanetDiscard = ({ discards }) => {
  // Convert the discard pile into a rank map [0,0,0,2,1] would mean two 4's and a 5 have been discarded
  let discardMap = new Array(5).fill(0);
  _.map(discards, discardId => {
    const { rank } = getCard(discardId);
    discardMap[rank - 1]++;
  });

  // Render verticals for each set
  const discardRanks = _.map(discardMap, (rankCount, rank) => {
    let dot = [];
    for (let i = 0; i < rankCount; i++) {
      dot.push(
        <View style={styles.discardTextContainer}>
          <Text style={styles.discardText}>{rank + 1}</Text>
        </View>
      );
    }
    return <View style={styles.discardColumnContainer}>{dot}</View>;
  });

  return <View style={styles.discardContainer}>{discardRanks}</View>;
};

export default ({ discards }) => (
  <PlanetDiscard discards={discards} />
);

const styles = StyleSheet.create({
  discardContainer: {
    flexDirection: "row",
    borderColor: "blue",
    marginRight: 6,
    marginLeft: 6,
    position: "absolute",
    marginTop: 56
  },
  discardColumnContainer: {
    flex: 1,
    flexDirection: "column",
    borderColor: "blue"
  },
  discardTextContainer: {
    height: 10
  },
  discardText: {
    fontSize: 10,
    color: colors.slate,
    fontFamily: "SpaceMono",
    position: "absolute"
  }
});
