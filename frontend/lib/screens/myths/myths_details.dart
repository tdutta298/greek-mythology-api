import 'package:flutter/material.dart';

class MythDetailsPage extends StatelessWidget {
  final Map myth;
  const MythDetailsPage({super.key, required this.myth});

  Widget _buildDetail(String title, dynamic value) {
    if (value is List) value = value.join(', ');
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text("$title: ", style: const TextStyle(fontWeight: FontWeight.bold)),
          Expanded(child: Text(value ?? "N/A")),
        ],
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text(myth['title']), backgroundColor: Colors.purple),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            _buildDetail("Summary", myth['summary']),
            _buildDetail("Characters", myth['characters']),
            _buildDetail("Locations", myth['locations']),
            _buildDetail("Moral", myth['moral']),
            _buildDetail("Source", myth['source']),
          ],
        ),
      ),
    );
  }
}
