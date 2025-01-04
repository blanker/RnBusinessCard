import { View, Image, Text, Button, StyleSheet, Linking, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { SafeAreaProvider, SafeAreaView, useSafeAreaInsets  } from 'react-native-safe-area-context';

export default function HomeScreen() {
    const onContactMe = () => {
        //console.warn("Contact me");
        Linking.openURL("mailto:wangzhiyun@sina.com")
    }

    // return (
    //     <View style={{backgroundColor: 'palegreen'}}>
    //         <Text>Title</Text>
    //         <Text>Footer</Text>
    //     </View>
    // );
    console.log("hello app")
    console.warn("hello app")
  return (

    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
        <SafeAreaProvider><SafeAreaView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Welcome!</ThemedText>
        <HelloWave />
      </ThemedView>
      <ThemedView style={{...styles.stepContainer}}>
        <ThemedText type="subtitle">Step 1: Try it</ThemedText>
        <ThemedText>
          Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
          Press{' '}
          <ThemedText type="defaultSemiBold">
            {Platform.select({
              ios: 'cmd + d',
              android: 'cmd + m',
              web: 'F12'
            })}
          </ThemedText>{' '}
          to open developer tools.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 2: Explore</ThemedText>
        <ThemedText>
          Tap the Explore tab to learn more about what's included in this starter app.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
        <ThemedText>
          When you're ready, run{' '}
          <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
          <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
          <ThemedText type="defaultSemiBold">app-example</ThemedText>.
        </ThemedText>

          <ThemedView style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              <Image
                  source={require('@/assets/images/vim.tutorial.png')}
                  style={{marginTop: -75, width: 150, height: 150, borderRadius: 150, borderWidth: 5, borderColor: 'white'}}
              />
              <ThemedText type='title'>Blanker</ThemedText>
              <View style={{ flexDirection: 'row', marginVertical: 10, gap: 10 }}>
                  <FontAwesome6 name="github" size={24} color="black" />
                  <FontAwesome6 name="x-twitter" size={24} color="black" />
                  <FontAwesome6 name="at" size={24} color="black" />
              </View>
              <Button title='Contact me' onPress={onContactMe}/>
              <Text style={styles.poem}>
                  汉皇重色思倾国，御宇多年求不得。
                  杨家有女初长成，养在深闺人未识。
                  天生丽质难自弃，一朝选在君王侧。
                  回眸一笑百媚生，六宫粉黛无颜色。
                  春寒赐浴华清池，温泉水滑洗凝脂。
                  侍儿扶起娇无力，始是新承恩泽时。
                  云鬓花颜金步摇，芙蓉帐暖度春宵。
                  春宵苦短日高起，从此君王不早朝。
                  承欢侍宴无闲暇，春从春游夜专夜。
                  后宫佳丽三千人，三千宠爱在一身。
                  金屋妆成娇侍夜，玉楼宴罢醉和春。
                  姊妹弟兄皆列土，可怜光彩生门户。
                  遂令天下父母心，不重生男重生女。
                  骊宫高处入青云，仙乐风飘处处闻。
                  缓歌慢舞凝丝竹，尽日君王看不足。
                  渔阳鼙鼓动地来，惊破霓裳羽衣曲。

                  九重城阙烟尘生，千乘万骑西南行。
                  翠华摇摇行复止，西出都门百余里。
                  六军不发无奈何，宛转蛾眉马前死。
                  花钿委地无人收，翠翘金雀玉搔头。
                  君王掩面救不得，回看血泪相和流。
                  黄埃散漫风萧索，云栈萦纡登剑阁。
                  峨嵋山下少人行，旌旗无光日色薄。
                  蜀江水碧蜀山青，圣主朝朝暮暮情。
                  行宫见月伤心色，夜雨闻铃肠断声。
                  天旋地转回龙驭，到此踌躇不能去。(地转 一作：日转)
                  马嵬坡下泥土中，不见玉颜空死处。
                  君臣相顾尽沾衣，东望都门信马归。
                  归来池苑皆依旧，太液芙蓉未央柳。
                  芙蓉如面柳如眉，对此如何不泪垂？
                  春风桃李花开日，秋雨梧桐叶落时。(花开日 一作：花开夜)
                  西宫南内多秋草，落叶满阶红不扫。(南内 一作：南苑)
                  梨园弟子白发新，椒房阿监青娥老。
                  夕殿萤飞思悄然，孤灯挑尽未成眠。
                  迟迟钟鼓初长夜，耿耿星河欲曙天。
                  鸳鸯瓦冷霜华重，翡翠衾寒谁与共？
                  悠悠生死别经年，魂魄不曾来入梦。

                  临邛道士鸿都客，能以精诚致魂魄。
                  为感君王辗转思，遂教方士殷勤觅。
                  排空驭气奔如电，升天入地求之遍。
                  上穷碧落下黄泉，两处茫茫皆不见。
                  忽闻海上有仙山，山在虚无缥缈间。
                  楼阁玲珑五云起，其中绰约多仙子。
                  中有一人字太真，雪肤花貌参差是。
                  金阙西厢叩玉扃，转教小玉报双成。
                  闻道汉家天子使，九华帐里梦魂惊。
                  揽衣推枕起徘徊，珠箔银屏迤逦开。
                  云鬓半偏新睡觉，花冠不整下堂来。(云鬓 一作：云髻)

                  风吹仙袂飘飖举，犹似霓裳羽衣舞。(飘飖 一作：飘飘)
                  玉容寂寞泪阑干，梨花一枝春带雨。(阑 通：栏)
                  含情凝睇谢君王，一别音容两渺茫。
                  昭阳殿里恩爱绝，蓬莱宫中日月长。
                  回头下望人寰处，不见长安见尘雾。
                  惟将旧物表深情，钿合金钗寄将去。
                  钗留一股合一扇，钗擘黄金合分钿。
                  但令心似金钿坚，天上人间会相见。(但令 一作：但教)

                  临别殷勤重寄词，词中有誓两心知。
                  七月七日长生殿，夜半无人私语时。
                  在天愿作比翼鸟，在地愿为连理枝。
                  天长地久有时尽，此恨绵绵无绝期。
              </Text>
          </ThemedView>
      </ThemedView>
      </SafeAreaView></SafeAreaProvider>
    </ParallaxScrollView>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
    poem: {
        fontSize: 16,
        padding: 10,
        lineHeight: 20
    }
});
