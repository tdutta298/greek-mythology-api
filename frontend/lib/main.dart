import 'package:flutter/material.dart';
import 'screens/creatures/creatures_list.dart';
import 'screens/gods/gods_list.dart';
import 'screens/heroes/heroes_list.dart';
import 'screens/myths/myths_list.dart';


void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Greek Mythology',
      debugShowCheckedModeBanner: false,
      theme: ThemeData.dark(),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Padding(
          padding: EdgeInsets.only(top: 20),
          child: Text(
            "Greek Mythology",
            style: TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 30,
            ),
          ),
        ),
        centerTitle: true,
        toolbarHeight: 80,
      ),
      body: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              buildCategoryBox("Gods", Colors.blue, () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const GodsListPage()),
                );
              }),
              buildCategoryBox("Heroes", Colors.pink, () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const HeroesListPage()),
                );
              }),
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              buildCategoryBox("Creatures", Colors.orange, () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const CreaturesListPage()),
                );
              }),
              buildCategoryBox("Myths", Colors.purple, () {
                Navigator.push(
                  context,
                  MaterialPageRoute(builder: (context) => const MythsListPage()),
                );
              }),
            ],
          ),
        ],
      ),
    );
  }

  Widget buildCategoryBox(String title, Color color, VoidCallback onTap) {
    return GestureDetector(
      onTap: onTap,
      child: Container(
        height: 150,
        width: 150,
        margin: const EdgeInsets.all(10.0),
        decoration: BoxDecoration(
          color: color,
          borderRadius: BorderRadius.circular(16.0),
        ),
        child: Center(
          child: Text(
            title,
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 20,
            ),
          ),
        ),
      ),
    );
  }
}
