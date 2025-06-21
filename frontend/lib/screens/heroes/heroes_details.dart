import 'package:flutter/material.dart';

class HeroDetailsPage extends StatelessWidget {
  final Map hero;
  const HeroDetailsPage({super.key, required this.hero});

  Widget _buildDetail(String title, dynamic value) {
    String displayValue = "N/A";
    
    if (value != null) {
      if (value is List) {
        if (value.isNotEmpty) {
          displayValue = value.where((item) => item != null && item.toString().trim().isNotEmpty).join(', ');
          if (displayValue.isEmpty) displayValue = "N/A";
        }
      } else if (value is String) {
        if (value.trim().isNotEmpty) {
          displayValue = value.trim();
        }
      } else {
        String strValue = value.toString().trim();
        if (strValue.isNotEmpty && strValue != 'null') {
          displayValue = strValue;
        }
      }
    }
    
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 8),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            "$title:",
            style: const TextStyle(
              fontWeight: FontWeight.bold,
              fontSize: 16,
              color: Colors.pink,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            displayValue,
            style: const TextStyle(fontSize: 14),
          ),
          const Divider(color: Colors.grey),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    // Debug: Print hero data to console
    print('Hero details: $hero');
    
    return Scaffold(
      appBar: AppBar(
        title: Text(hero['name'] ?? 'Unknown Hero'),
        backgroundColor: Colors.pink,
      ),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildDetail("Heroic Deeds", hero['heroicDeeds']),
            _buildDetail("Parentage", hero['parentage']),
            _buildDetail("Associated Myths", hero['associatedMyths']),
            _buildDetail("Fate", hero['fate']),
          ],
        ),
      ),
    );
  }
}