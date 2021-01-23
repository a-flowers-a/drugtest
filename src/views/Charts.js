import React, { useState } from 'react';
import { StyleSheet, Text, View, processColor } from 'react-native';
import {PieChart} from 'react-native-charts-wrapper';

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    chart: {
      flex: 1
    }
});

export default function Charts(props){

    const [legend, setLegend] = useState({
        enabled: true,
        textSize: 15,
        form: 'CIRCLE',

        horizontalAlignment: "RIGHT",
        verticalAlignment: "CENTER",
        orientation: "VERTICAL",
        wordWrapEnabled: true
    });

    const [data, setData] = useState({
        dataSets: [{
            values: [{value: 45, label: 'Sandwiches'},
              {value: 21, label: 'Salads'},
              {value: 15, label: 'Soup'},
              {value: 9, label: 'Beverages'},
              {value: 15, label: 'Desserts'}],
            label: 'Pie dataset',
            config: {
              colors: [processColor('#C0FF8C'), processColor('#FFF78C'), processColor('#FFD08C'), processColor('#8CEAFF'), processColor('#FF8C9D')],
              valueTextSize: 20,
              valueTextColor: processColor('green'),
              sliceSpace: 5,
              selectionShift: 13,
              // xValuePosition: "OUTSIDE_SLICE",
              // yValuePosition: "OUTSIDE_SLICE",
              valueFormatter: "#.#'%'",
              valueLineColor: processColor('green'),
              valueLinePart1Length: 0.5
            }
        }],
    });

    const [highlights, setHighlights] = useState([{x:2}]);
    const [description, setDescription] = useState({
        text: 'This is Pie chart description',
        textSize: 15,
        textColor: processColor('darkgray'),
    });

    function handleSelect(event) {
        let entry = event.nativeEvent
        console.log("entry", entry);
        console.log(event.nativeEvent)
    }//handleSelect

    return(
        <View style={{flex: 1}}>
            <View>
                <Text>selected:</Text>
            </View>

            <View style={styles.container}>
                <PieChart
                    style={styles.chart}
                    logEnabled={true}
                    chartBackgroundColor={processColor('pink')}
                    chartDescription={description}
                    data={data}
                    legend={legend}
                    highlights={highlights}

                    extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}

                    entryLabelColor={processColor('green')}
                    entryLabelTextSize={20}
                    entryLabelFontFamily={'HelveticaNeue-Medium'}
                    drawEntryLabels={true}

                    rotationEnabled={true}
                    rotationAngle={45}
                    usePercentValues={true}
                    styledCenterText={{text:'Pie center text!', color: processColor('pink'), fontFamily: 'HelveticaNeue-Medium', size: 20}}
                    centerTextRadiusPercent={100}
                    holeRadius={40}
                    holeColor={processColor('#f0f0f0')}
                    transparentCircleRadius={45}
                    transparentCircleColor={processColor('#f0f0f088')}
                    maxAngle={350}
                    onSelect={handleSelect}
                    onChange={(event) => console.log(event.nativeEvent)}
                />
            </View>
        </View>
    );
}//Charts